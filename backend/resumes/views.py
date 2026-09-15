import os
import re
import json
import time
import uuid
import hmac
import hashlib
import requests
from dotenv import load_dotenv
from django.conf import settings
from django.http import HttpResponse
from rest_framework import status, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from django.db.models import Sum, Count
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .models import (
    Resume, PersonalInfo, Education, Experience,
    Project, Skill, Certification, Achievement, JobDescription,
    ATSAnalysis, Template, ResumePayment, UserProfile
)
from .serializers import (
    RegisterSerializer, UserSerializer, ResumeListSerializer,
    ResumeDetailSerializer, PersonalInfoSerializer, EducationSerializer,
    ExperienceSerializer, ProjectSerializer, SkillSerializer,
    CertificationSerializer, AchievementSerializer, JobDescriptionSerializer, ATSAnalysisSerializer,
    TemplateSerializer
)
from ats.engine import analyze_resume
from ai_engine.service import (
    improve_bullets_ai, generate_summary_ai, extract_jd_keywords_ai, autofill_role_resume_ai
)
from .pdf_exporter import generate_pdf_bytes

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def google_auth_view(request):
    """
    Authenticate a user via Google Sign-In credential or profile data.
    Verifies token or provisions user account and returns JWT tokens.
    """
    credential = request.data.get('credential')
    email = request.data.get('email')
    name = request.data.get('name', '')
    picture = request.data.get('picture', '')

    # 1. If Google ID Token is supplied, verify via Google's tokeninfo API
    if credential:
        try:
            res = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={credential}", timeout=8)
            if res.status_code == 200:
                google_info = res.json()
                email = google_info.get('email') or email
                name = google_info.get('name') or name or (email.split('@')[0] if email else '')
                picture = google_info.get('picture') or picture
            else:
                if not email:
                    return Response({'error': 'Invalid Google credential token'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            if not email:
                return Response({'error': f'Google verification failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if not email:
        return Response({'error': 'Email address is required'}, status=status.HTTP_400_BAD_REQUEST)

    # 2. Get or create Django user by email
    clean_email = email.strip().lower()
    user = User.objects.filter(email__iexact=clean_email).first()
    if not user:
        user = User.objects.filter(username__iexact=clean_email).first()

    if not user:
        base_username = clean_email.split('@')[0].replace('.', '_')[:25]
        cand_username = base_username
        suffix = 1
        while User.objects.filter(username=cand_username).exists():
            cand_username = f"{base_username}_{suffix}"
            suffix += 1
            
        first_name = name.split(' ')[0] if name else ''
        last_name = ' '.join(name.split(' ')[1:]) if name and len(name.split(' ')) > 1 else ''
        
        user = User.objects.create_user(
            username=cand_username,
            email=clean_email,
            first_name=first_name,
            last_name=last_name
        )
        user.set_unusable_password()
        user.save()
    else:
        if name and not user.first_name:
            user.first_name = name.split(' ')[0]
            if len(name.split(' ')) > 1:
                user.last_name = ' '.join(name.split(' ')[1:])

    user.last_login = timezone.now()
    user.save()

    # Save or update UserProfile
    profile, _ = UserProfile.objects.get_or_create(user=user)
    if picture:
        profile.avatar_url = picture
        profile.save()
    elif not profile.avatar_url:
        profile.avatar_url = f"https://ui-avatars.com/api/?name={user.first_name or user.username}&background=4F46E5&color=fff&size=128"
        profile.save()

    # Check if user has admin privileges
    admin_emails = [e.strip().lower() for e in os.getenv('ADMIN_EMAILS', '').split(',') if e.strip()]
    is_admin = bool(user.is_staff or user.is_superuser or clean_email in admin_emails)
    if is_admin and not user.is_staff:
        user.is_staff = True
        user.save()

    # 3. Generate SimpleJWT tokens
    refresh = RefreshToken.for_user(user)
    display_name = f"{user.first_name} {user.last_name}".strip() or user.username
    
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email or clean_email,
            'name': display_name,
            'picture': profile.avatar_url or picture,
            'isGoogleUser': True,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'isAdmin': is_admin
        }
    })

@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
def google_config_view(request):
    """Get or update the active Google OAuth Client ID."""
    if request.method == 'POST':
        client_id = request.data.get('client_id', '').strip()
        if client_id:
            settings.GOOGLE_CLIENT_ID = client_id
            env_path = settings.BASE_DIR / '.env'
            if env_path.exists():
                content = env_path.read_text(encoding='utf-8')
                if 'GOOGLE_CLIENT_ID=' in content:
                    new_content = re.sub(r'GOOGLE_CLIENT_ID=.*', f'GOOGLE_CLIENT_ID={client_id}', content)
                else:
                    new_content = content + f"\nGOOGLE_CLIENT_ID={client_id}\n"
                env_path.write_text(new_content, encoding='utf-8')
            return Response({'client_id': client_id, 'is_configured': True, 'saved': True})

    client_id = getattr(settings, 'GOOGLE_CLIENT_ID', '').strip()
    return Response({
        'client_id': client_id,
        'is_configured': bool(client_id)
    })

class ResumeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Resume.objects.filter(user=self.request.user).order_by('-updated_at')

    def get_serializer_class(self):
        if self.action in ['list']:
            return ResumeListSerializer
        return ResumeDetailSerializer

    def perform_create(self, serializer):
        resume = serializer.save(user=self.request.user)
        PersonalInfo.objects.get_or_create(
            resume=resume,
            defaults={
                'full_name': 'Manisha Chauhan',
                'phone': '+91 7249516523',
                'email': 'manishachauhan5469@gmail.com',
                'location': 'Delhi, India',
                'linkedin_url': 'https://linkedin.com/in/manishachauhan',
                'github_url': 'https://github.com/manisha',
                'portfolio_url': 'https://manisha-portfolio.com',
                'summary': 'Data Analytics Fresher with a strong foundation in Python, SQL, Excel, Power BI, and data visualization. Skilled in data cleaning, data preprocessing, exploratory data analysis (EDA), statistical analysis, and creating interactive dashboards to derive meaningful business insights. Hands-on experience working with real-world datasets and converting raw data into actionable insights. Strong analytical and problem-solving abilities with a keen interest in using data to support business decisions.'
            }
        )
        # Populate initial Projects
        Project.objects.create(
            resume=resume,
            name='E-Commerce Sales & Customer Analytics',
            description='Analyzed sales and customer data to identify revenue trends, top-performing products, customer segments, and business growth opportunities using interactive Power BI dashboards.',
            tech_stack=['Python', 'SQL', 'Power BI', 'Excel'],
            link='https://github.com/analyst/ecommerce-sales-analytics',
            bullets=['Analyzed sales and customer data to identify revenue trends, top-performing products, customer segments, and business growth opportunities using interactive Power BI dashboards.'],
            order_index=0
        )
        Project.objects.create(
            resume=resume,
            name='Employee HR Analytics & Attrition Analysis',
            description='Analyzed employee data to identify attrition patterns, salary trends, department performance, and key factors influencing employee turnover through data-driven dashboards.',
            tech_stack=['Python', 'SQL', 'Power BI', 'Excel'],
            link='https://github.com/analyst/employee-hr-attrition-analytics',
            bullets=['Analyzed employee data to identify attrition patterns, salary trends, department performance, and key factors influencing employee turnover through data-driven dashboards.'],
            order_index=1
        )
        # Populate initial Skills
        skills_data = [
            ("Languages & Core", "Python (Pandas, NumPy, Matplotlib, Seaborn), SQL, Advanced Excel (VLOOKUP, XLOOKUP, Pivot Tables, Macros)"),
            ("BI & Data Visualization", "Power BI (DAX, Data Modeling, Interactive Dashboards), Tableau"),
            ("Data Analysis & Preprocessing", "Data Cleaning, Data Preprocessing, Exploratory Data Analysis (EDA), Statistical Analysis"),
            ("Databases", "MySQL, PostgreSQL"),
            ("Development Tools & DevOps", "Jupyter Notebook, VS Code, Git, GitHub, Power Query, ETL Pipelines"),
            ("Soft Skills", "Data Storytelling, Dashboard Design, Business Insight Generation, Problem Solving, Analytical Thinking, Team Collaboration")
        ]
        for cat, s_name in skills_data:
            Skill.objects.create(resume=resume, category=cat, skill_name=s_name)

        # Populate initial Education
        Education.objects.create(
            resume=resume,
            institution='Indus Institute of Technology, Ahmedabad',
            degree='Bachelor of Technology (B.Tech.) - CSE | CGPA: 9.2/10',
            field_of_study='Computer Science & Engineering',
            start_date='Sep 2022',
            end_date='May 2026',
            order_index=0
        )
        # Populate initial Achievements
        Achievement.objects.create(
            resume=resume,
            title='Top 15 - HackHazards Hackathon 2025 (Fluvio Track) for DevNest AI.',
            date='May 2025',
            order_index=0
        )
        Achievement.objects.create(
            resume=resume,
            title='Solved 500+ DSA problems on LeetCode & GeeksforGeeks using Java.',
            date='Oct 2024 - Jan 2026',
            order_index=1
        )

# Sub-resource views
@api_view(['POST', 'PATCH'])
@permission_classes([permissions.IsAuthenticated])
def personal_info_detail(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    p_info, _ = PersonalInfo.objects.get_or_create(resume=resume)
    serializer = PersonalInfoSerializer(p_info, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def experience_list_create(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    serializer = ExperienceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(resume=resume)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def experience_detail(request, pk, exp_pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    exp = get_object_or_404(Experience, pk=exp_pk, resume=resume)
    if request.method == 'DELETE':
        exp.delete()
        return Response(status=status.HTTP_24_NO_CONTENT if hasattr(status, 'HTTP_24_NO_CONTENT') else status.HTTP_204_NO_CONTENT)
    serializer = ExperienceSerializer(exp, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def education_list_create(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    serializer = EducationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(resume=resume)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def education_detail(request, pk, edu_pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    edu = get_object_or_404(Education, pk=edu_pk, resume=resume)
    if request.method == 'DELETE':
        edu.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = EducationSerializer(edu, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def project_list_create(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(resume=resume)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def project_detail(request, pk, proj_pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    proj = get_object_or_404(Project, pk=proj_pk, resume=resume)
    if request.method == 'DELETE':
        proj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = ProjectSerializer(proj, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def skill_list_create(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    serializer = SkillSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(resume=resume)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def skill_detail(request, pk, skill_pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    sk = get_object_or_404(Skill, pk=skill_pk, resume=resume)
    if request.method == 'DELETE':
        sk.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = SkillSerializer(sk, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def achievement_list_create(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    serializer = AchievementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(resume=resume)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def achievement_detail(request, pk, ach_pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    ach = get_object_or_404(Achievement, pk=ach_pk, resume=resume)
    if request.method == 'DELETE':
        ach.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = AchievementSerializer(ach, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# AI Endpoints
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def generate_summary(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    p_info, _ = PersonalInfo.objects.get_or_create(resume=resume)
    
    role = request.data.get('role', '') or (resume.experience.first().role if resume.experience.exists() else '')
    years = request.data.get('years', '3+')
    skills = [s.skill_name for s in resume.skills.all()]
    target_job_title = resume.target_job_title or ''
    
    summary_text = generate_summary_ai(role, years, skills, target_job_title)
    p_info.summary = summary_text
    p_info.save()
    
    return Response({"summary": summary_text})

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def improve_bullets(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    exp_id = request.data.get('experience_id')
    keywords = request.data.get('keywords', [])
    
    if exp_id:
        exp = get_object_or_404(Experience, pk=exp_id, resume=resume)
        raw = exp.raw_description or (" ".join(exp.bullets) if exp.bullets else "")
        bullets = improve_bullets_ai(raw, keywords)
        exp.bullets = bullets
        exp.save()
        return Response({"experience_id": exp.id, "bullets": bullets})
    else:
        raw = request.data.get('raw_description', '')
        bullets = improve_bullets_ai(raw, keywords)
        return Response({"bullets": bullets})

# Job Description & ATS Analysis
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_job_description(request):
    raw_text = request.data.get('raw_text', '')
    title = request.data.get('title', '')
    company = request.data.get('company', '')
    
    if not raw_text:
        return Response({"error": "raw_text is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    keywords_dict = extract_jd_keywords_ai(raw_text)
    if not title:
        title = keywords_dict.get("job_title", "Target Role")
        
    jd = JobDescription.objects.create(
        user=request.user,
        title=title,
        company=company,
        raw_text=raw_text,
        extracted_keywords=keywords_dict
    )
    return Response(JobDescriptionSerializer(jd).data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def analyze_ats(request):
    resume_id = request.data.get('resume_id')
    jd_id = request.data.get('job_description_id')
    
    resume = get_object_or_404(Resume, pk=resume_id, user=request.user)
    jd = get_object_or_404(JobDescription, pk=jd_id, user=request.user)
    
    analysis_data = analyze_resume(resume, jd)
    
    model_fields = {
        'overall_score', 'keyword_match_score', 'skills_match_score', 'job_title_match_score',
        'experience_relevance_score', 'education_score', 'structure_score', 'formatting_score',
        'matched_keywords', 'missing_keywords', 'suggestions'
    }
    filtered_db_data = {k: v for k, v in analysis_data.items() if k in model_fields}
    
    ats_obj, _ = ATSAnalysis.objects.update_or_create(
        resume=resume,
        job_description=jd,
        defaults=filtered_db_data
    )
    
    res_data = ATSAnalysisSerializer(ats_obj).data
    res_data.update(analysis_data)
    return Response(res_data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def upload_and_analyze_pdf_ats(request):
    from ats.parser import parse_uploaded_resume
    from ats.engine import analyze_resume_data
    
    file_obj = request.FILES.get('resume_file')
    jd_id = request.data.get('job_description_id')
    
    if not file_obj:
        return Response({"error": "No resume file provided."}, status=status.HTTP_400_BAD_REQUEST)
        
    jd = get_object_or_404(JobDescription, pk=jd_id, user=request.user)
    
    parse_res = parse_uploaded_resume(file_obj)
    if not parse_res.get("success"):
        return Response({"error": parse_res.get("error", "Failed to parse file")}, status=status.HTTP_400_BAD_REQUEST)
        
    raw_text = parse_res["raw_text"]
    analysis_data = analyze_resume_data(raw_resume_text=raw_text, jd_text=jd.raw_text or "")
    analysis_data["is_uploaded_pdf"] = True
    analysis_data["file_name"] = file_obj.name
    
    return Response(analysis_data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_sample_jds(request):
    from ats.samples import SAMPLE_JOB_DESCRIPTIONS
    return Response(SAMPLE_JOB_DESCRIPTIONS)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_ats_history(request):
    history = ATSAnalysis.objects.filter(resume__user=request.user).order_by('-created_at')[:10]
    data = []
    for item in history:
        data.append({
            "id": item.id,
            "resume_id": item.resume_id,
            "resume_title": item.resume.title,
            "job_title": item.job_description.title or "Target Role",
            "company": item.job_description.company or "Company",
            "overall_score": item.overall_score,
            "created_at": item.created_at.strftime("%b %d, %Y")
        })
    return Response(data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def optimize_for_job(request, pk):
    master_resume = get_object_or_404(Resume, pk=pk, user=request.user)
    jd_id = request.data.get('job_description_id')
    jd = get_object_or_404(JobDescription, pk=jd_id, user=request.user)
    
    # 1. Create Child Resume (preserving master)
    child_title = f"{master_resume.title} - Tailored for {jd.title or jd.company or 'Job'}"
    child_resume = Resume.objects.create(
        user=request.user,
        title=child_title,
        is_master=False,
        parent_resume=master_resume,
        template_id=master_resume.template_id,
        target_job_title=jd.title,
        target_company=jd.company
    )
    
    # 2. Clone Personal Info & Update Summary for Target Job
    if hasattr(master_resume, 'personal_info'):
        pi = master_resume.personal_info
        skills_list = [s.skill_name for s in master_resume.skills.all()]
        new_summary = generate_summary_ai(
            role=jd.title or "Software Developer",
            years="3+",
            skills=skills_list,
            target_job_title=jd.title
        )
        PersonalInfo.objects.create(
            resume=child_resume,
            full_name=pi.full_name,
            email=pi.email,
            phone=pi.phone,
            location=pi.location,
            linkedin_url=pi.linkedin_url,
            github_url=pi.github_url,
            portfolio_url=pi.portfolio_url,
            summary=new_summary
        )
        
    # 3. Clone & Enhance Skills with missing JD skills
    jd_keywords = jd.extracted_keywords.get('required_skills', [])
    existing_skills = set()
    for s in master_resume.skills.all():
        Skill.objects.create(resume=child_resume, category=s.category, skill_name=s.skill_name)
        existing_skills.add(s.skill_name.lower())
        
    for kw in jd_keywords:
        if kw.lower() not in existing_skills:
            Skill.objects.create(resume=child_resume, category='Technical', skill_name=kw)
            
    # 4. Clone & Optimize Experience Bullets with JD Keywords
    for exp in master_resume.experience.all():
        raw = exp.raw_description or (" ".join(exp.bullets) if exp.bullets else "")
        improved = improve_bullets_ai(raw, jd_keywords)
        Experience.objects.create(
            resume=child_resume,
            company=exp.company,
            role=exp.role,
            start_date=exp.start_date,
            end_date=exp.end_date,
            is_current=exp.is_current,
            raw_description=exp.raw_description,
            bullets=improved,
            order_index=exp.order_index
        )
        
    # 5. Clone Education & Projects
    for ed in master_resume.education.all():
        Education.objects.create(
            resume=child_resume,
            institution=ed.institution,
            degree=ed.degree,
            field_of_study=ed.field_of_study,
            start_date=ed.start_date,
            end_date=ed.end_date,
            grade=ed.grade,
            order_index=ed.order_index
        )
        
    for proj in master_resume.projects.all():
        Project.objects.create(
            resume=child_resume,
            name=proj.name,
            description=proj.description,
            tech_stack=proj.tech_stack,
            link=proj.link,
            bullets=proj.bullets,
            order_index=proj.order_index
        )
        
    # Run initial ATS analysis for new child resume
    analysis_data = analyze_resume(child_resume, jd)
    model_fields = {
        'overall_score', 'keyword_match_score', 'skills_match_score', 'job_title_match_score',
        'experience_relevance_score', 'education_score', 'structure_score', 'formatting_score',
        'matched_keywords', 'missing_keywords', 'suggestions'
    }
    filtered_db_data = {k: v for k, v in analysis_data.items() if k in model_fields}
    ATSAnalysis.objects.create(resume=child_resume, job_description=jd, **filtered_db_data)
    
    res_data = ResumeDetailSerializer(child_resume).data
    return Response({
        "resume": res_data,
        "id": child_resume.id,
        "optimized_score": analysis_data.get("overall_score", 80.0),
        "optimized_analysis": analysis_data
    }, status=status.HTTP_201_CREATED)

# Templates & Export
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def list_templates(request):
    templates = [
        {"id": 1, "name": "Modern Minimalist", "is_ats_safe": True, "preview_image": "/templates/modern.png"},
        {"id": 2, "name": "Executive Professional", "is_ats_safe": True, "preview_image": "/templates/executive.png"},
        {"id": 3, "name": "Tech Sleek", "is_ats_safe": True, "preview_image": "/templates/tech.png"}
    ]
    return Response(templates)

def get_razorpay_creds():
    load_dotenv(settings.BASE_DIR / '.env', override=True)
    key_id = (os.getenv('RAZORPAY_KEY_ID') or getattr(settings, 'RAZORPAY_KEY_ID', '')).strip()
    key_secret = (os.getenv('RAZORPAY_KEY_SECRET') or getattr(settings, 'RAZORPAY_KEY_SECRET', '')).strip()
    return key_id, key_secret

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def check_payment_status(request, pk):
    """Check whether ₹29 payment has been completed for this resume."""
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    is_paid = ResumePayment.objects.filter(resume=resume, status='paid').exists()
    key_id, _ = get_razorpay_creds()
    is_configured = bool(key_id and not key_id.startswith('rzp_test_placeholder'))
    amount_paise = getattr(settings, 'RAZORPAY_AMOUNT_PAISE', 2900)
    
    return Response({
        'resume_id': resume.id,
        'is_paid': is_paid,
        'amount': amount_paise / 100,
        'amount_paise': amount_paise,
        'currency': 'INR',
        'key_id': key_id,
        'is_configured': is_configured
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_razorpay_order(request, pk):
    """Create a Razorpay order for ₹29 (2900 paise)."""
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    
    # If already paid, inform client
    if ResumePayment.objects.filter(resume=resume, status='paid').exists():
        return Response({
            'already_paid': True,
            'message': 'This resume is already unlocked. You can download it directly.'
        })
        
    amount = getattr(settings, 'RAZORPAY_AMOUNT_PAISE', 2900)
    currency = 'INR'
    key_id, key_secret = get_razorpay_creds()
    
    is_real_keys = bool(key_id and key_secret and not key_id.startswith('rzp_test_placeholder'))
    order_id = None
    
    if is_real_keys:
        try:
            res = requests.post(
                'https://api.razorpay.com/v1/orders',
                auth=(key_id, key_secret),
                json={
                    'amount': amount,
                    'currency': currency,
                    'receipt': f"rcpt_res_{resume.id}_{int(time.time())}",
                    'notes': {
                        'resume_id': str(resume.id),
                        'resume_title': resume.title,
                        'user': request.user.username
                    }
                },
                timeout=10
            )
            if res.status_code in [200, 201]:
                order_data = res.json()
                order_id = order_data.get('id')
            else:
                return Response({
                    'error': 'Razorpay order creation failed',
                    'details': res.text
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'error': f'Failed to connect to Razorpay: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        # Development test order fallback when keys are in test mode
        order_id = f"order_demo_{int(time.time())}_{uuid.uuid4().hex[:6]}"
        
    # Track order in database
    payment = ResumePayment.objects.create(
        user=request.user,
        resume=resume,
        razorpay_order_id=order_id,
        amount=amount,
        currency=currency,
        status='created'
    )
    
    return Response({
        'order_id': order_id,
        'amount': amount,
        'currency': currency,
        'key_id': key_id,
        'is_demo_mode': not is_real_keys,
        'resume_title': resume.title
    })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def verify_razorpay_payment(request, pk):
    """Verify Razorpay payment signature and unlock resume PDF."""
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    
    order_id = request.data.get('razorpay_order_id')
    payment_id = request.data.get('razorpay_payment_id', '')
    signature = request.data.get('razorpay_signature', '')
    
    if not order_id:
        return Response({'error': 'Missing razorpay_order_id'}, status=status.HTTP_400_BAD_REQUEST)
        
    payment = ResumePayment.objects.filter(resume=resume, razorpay_order_id=order_id).first()
    if not payment:
        payment = ResumePayment.objects.filter(razorpay_order_id=order_id).first()
        if not payment:
            return Response({'error': 'Order not found in records'}, status=status.HTTP_404_NOT_FOUND)
            
    _, key_secret = get_razorpay_creds()
    is_demo = order_id.startswith('order_demo_') or not key_secret or key_secret.startswith('rzp_secret_placeholder')
    
    if not is_demo:
        # Verify HMAC SHA256 signature
        body = f"{order_id}|{payment_id}".encode('utf-8')
        expected_signature = hmac.new(
            key_secret.encode('utf-8'),
            body,
            hashlib.sha256
        ).hexdigest()
        
        if not hmac.compare_digest(expected_signature, signature):
            payment.status = 'failed'
            payment.save()
            return Response({'error': 'Signature verification failed. Payment cannot be verified.'}, status=status.HTTP_400_BAD_REQUEST)

    # Mark as paid
    payment.razorpay_payment_id = payment_id or f"pay_demo_{uuid.uuid4().hex[:8]}"
    payment.razorpay_signature = signature or 'demo_verified_sig'
    payment.status = 'paid'
    payment.save()
    
    return Response({
        'success': True,
        'message': 'Payment of ₹29 verified successfully! Resume PDF unlocked.',
        'is_paid': True
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def export_pdf(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    
    # Check if payment is completed
    is_paid = ResumePayment.objects.filter(resume=resume, status='paid').exists()
    if not is_paid:
        amount_paise = getattr(settings, 'RAZORPAY_AMOUNT_PAISE', 2900)
        return HttpResponse(
            json.dumps({
                'error': 'Payment Required',
                'message': 'Payment of ₹29 is required before downloading this resume.',
                'requires_payment': True,
                'amount': amount_paise / 100,
                'resume_id': resume.id
            }),
            status=402,
            content_type='application/json'
        )

    template_id = request.query_params.get('template_id')
    if template_id:
        resume.template_id = int(template_id)
        resume.save()
        
    pdf_bytes = generate_pdf_bytes(resume)
    
    response = HttpResponse(pdf_bytes, content_type='application/pdf')
    filename = f"{resume.title.replace(' ', '_')}_Resume.pdf"
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def export_json_resume(request, pk):
    import json
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    p_info = getattr(resume, 'personal_info', None)
    
    json_data = {
        "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
        "basics": {
            "name": p_info.full_name if p_info else resume.title,
            "label": resume.target_job_title or "",
            "email": p_info.email if p_info else "",
            "phone": p_info.phone if p_info else "",
            "summary": p_info.summary if p_info else "",
            "location": {
                "address": p_info.location if p_info else ""
            },
            "profiles": []
        },
        "work": [],
        "education": [],
        "skills": [],
        "projects": []
    }
    
    if p_info and p_info.linkedin_url:
        json_data["basics"]["profiles"].append({
            "network": "LinkedIn",
            "url": p_info.linkedin_url
        })
    if p_info and p_info.github_url:
        json_data["basics"]["profiles"].append({
            "network": "GitHub",
            "url": p_info.github_url
        })
        
    for exp in resume.experience.all():
        json_data["work"].append({
            "name": exp.company,
            "position": exp.role,
            "startDate": exp.start_date,
            "endDate": "Present" if exp.is_current else exp.end_date,
            "summary": exp.raw_description or "",
            "highlights": exp.bullets or []
        })
        
    for edu in resume.education.all():
        json_data["education"].append({
            "institution": edu.institution,
            "studyType": edu.degree,
            "area": edu.field_of_study,
            "endDate": edu.end_date,
            "score": edu.grade or ""
        })
        
    for s in resume.skills.all():
        json_data["skills"].append({
            "name": s.skill_name,
            "level": "Expert"
        })
        
    for proj in resume.projects.all():
        json_data["projects"].append({
            "name": proj.name,
            "description": proj.description or "",
            "url": proj.link or "",
            "highlights": proj.bullets or []
        })
        
    response = HttpResponse(json.dumps(json_data, indent=2), content_type='application/json')
    response['Content-Disposition'] = f'attachment; filename="{resume.title.replace(" ", "_")}_resume.json"'
    return response

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def import_json_resume(request):
    data = request.data
    basics = data.get('basics', {})
    
    title = basics.get('name', 'Imported JSON Resume')
    target_job = basics.get('label', '')
    
    resume = Resume.objects.create(
        user=request.user,
        title=f"{title} (JSON Resume)",
        target_job_title=target_job
    )
    
    location_obj = basics.get('location', {})
    loc_str = location_obj.get('address') or location_obj.get('city') or ''
    
    profiles = basics.get('profiles', [])
    linkedin = next((p.get('url', '') for p in profiles if 'linkedin' in p.get('network', '').lower() or 'linkedin' in p.get('url', '').lower()), '')
    github = next((p.get('url', '') for p in profiles if 'github' in p.get('network', '').lower() or 'github' in p.get('url', '').lower()), '')
    
    PersonalInfo.objects.create(
        resume=resume,
        full_name=basics.get('name', ''),
        email=basics.get('email', ''),
        phone=basics.get('phone', ''),
        location=loc_str,
        summary=basics.get('summary', ''),
        linkedin_url=linkedin,
        github_url=github
    )
    
    for idx, w in enumerate(data.get('work', [])):
        Experience.objects.create(
            resume=resume,
            company=w.get('name') or w.get('company') or 'Company',
            role=w.get('position') or w.get('role') or 'Role',
            start_date=w.get('startDate', ''),
            end_date=w.get('endDate', ''),
            is_current=str(w.get('endDate', '')).lower() == 'present',
            raw_description=w.get('summary', ''),
            bullets=w.get('highlights', []),
            order_index=idx
        )
        
    for idx, ed in enumerate(data.get('education', [])):
        Education.objects.create(
            resume=resume,
            institution=ed.get('institution', 'University'),
            degree=ed.get('studyType') or ed.get('degree') or 'Degree',
            field_of_study=ed.get('area') or ed.get('field_of_study') or '',
            end_date=ed.get('endDate', ''),
            grade=str(ed.get('score', '')),
            order_index=idx
        )
        
    for sk in data.get('skills', []):
        name = sk.get('name') if isinstance(sk, dict) else str(sk)
        if name:
            Skill.objects.create(resume=resume, category='Technical', skill_name=name)
            
    for idx, pr in enumerate(data.get('projects', [])):
        Project.objects.create(
            resume=resume,
            name=pr.get('name', 'Project'),
            description=pr.get('description', ''),
            link=pr.get('url', ''),
            bullets=pr.get('highlights', []),
            order_index=idx
        )
        
    return Response(ResumeDetailSerializer(resume).data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def ai_autofill_role(request, pk):
    resume = get_object_or_404(Resume, pk=pk, user=request.user)
    role_name = request.data.get('role', '') or request.data.get('target_job_title', '') or 'Data Analytics'
    experience_level = request.data.get('experience_level', 'fresher')
    
    generated = autofill_role_resume_ai(role_name, experience_level)
    
    # 1. Update Resume Title & Target Job
    resume.target_job_title = generated.get('target_job_title', role_name)
    resume.save()
    
    # 2. Update Personal Summary
    p_info, _ = PersonalInfo.objects.get_or_create(resume=resume)
    p_info.summary = generated.get('summary', p_info.summary)
    p_info.save()
    
    # 3. Populate generated Skills
    resume.skills.all().delete()
    for sk in generated.get('skills', []):
        if isinstance(sk, dict):
            cat = sk.get('category', 'Technical')
            s_name = sk.get('skill_name', '')
        else:
            cat = 'Technical'
            s_name = str(sk)
        if s_name:
            Skill.objects.create(resume=resume, category=cat, skill_name=s_name)
            
    # 4. Populate Experience (empty by default for freshers, populated for 1yr / 3yr)
    is_fresher = str(experience_level).strip().lower() in ['fresher', '0', '0 yrs', '0 years', '0+ years', 'none']
    resume.experience.all().delete()
    if not is_fresher and generated.get('experience'):
        for idx, exp_data in enumerate(generated.get('experience', [])):
            Experience.objects.create(
                resume=resume,
                company=exp_data.get('company', 'Company'),
                role=exp_data.get('role', role_name),
                start_date=exp_data.get('start_date', 'Jan 2022'),
                end_date=exp_data.get('end_date', 'Present'),
                is_current=exp_data.get('is_current', True),
                bullets=exp_data.get('bullets', []),
                order_index=idx
            )
            
    # 5. Populate Projects
    resume.projects.all().delete()
    for idx, proj_data in enumerate(generated.get('projects', [])):
        Project.objects.create(
            resume=resume,
            name=proj_data.get('name', 'Project'),
            description=proj_data.get('description', ''),
            tech_stack=proj_data.get('tech_stack', []),
            link=proj_data.get('link', ''),
            bullets=proj_data.get('bullets', [proj_data.get('description', '')]),
            order_index=idx
        )
        
    # 6. Ensure default Education if missing
    if not resume.education.exists():
        Education.objects.create(
            resume=resume,
            institution='Indus Institute of Technology, Ahmedabad',
            degree='Bachelor of Technology (B.Tech.) - CSE | CGPA: 9.2/10',
            field_of_study='Computer Science & Engineering',
            start_date='Sep 2022',
            end_date='May 2026',
            order_index=0
        )

    # 7. Ensure default Achievements if missing
    if not resume.achievements.exists():
        Achievement.objects.create(
            resume=resume,
            title='Top 15 - HackHazards Hackathon 2025 (Fluvio Track) for DevNest AI.',
            date='May 2025',
            order_index=0
        )
        Achievement.objects.create(
            resume=resume,
            title='Solved 500+ DSA problems on LeetCode & GeeksforGeeks using Java.',
            date='Oct 2024 - Jan 2026',
            order_index=1
        )
        
    return Response(ResumeDetailSerializer(resume).data)


TEMPLATE_METADATA = {
    1: {"name": "Modern Clean", "category": "General & Tech", "style": "Classic Single Column"},
    2: {"name": "Minimalist Tech", "category": "Software & DevOps", "style": "Clean Dual Column"},
    3: {"name": "Executive Elite", "category": "Leadership & Business", "style": "High-Impact Header"},
    4: {"name": "Creative Impact", "category": "Design & Marketing", "style": "Modern Color Accent"},
    5: {"name": "Compact Professional", "category": "Academic & Engineering", "style": "High-Density Single Column"},
}

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def admin_overview_view(request):
    """
    Returns high-level statistics for Admin Dashboard:
    Total registered users, total resumes created, total Razorpay revenue, and recent activity.
    Restricted to admin/staff users only.
    """
    admin_emails = [e.strip().lower() for e in os.getenv('ADMIN_EMAILS', '').split(',') if e.strip()]
    user_email = (request.user.email or '').strip().lower()
    if not (request.user.is_staff or request.user.is_superuser or user_email in admin_emails):
        return Response({'detail': 'Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
    total_users = User.objects.count()
    total_resumes = Resume.objects.count()
    
    paid_payments = ResumePayment.objects.filter(status='paid')
    total_paid_orders = paid_payments.count()
    total_revenue_paise = paid_payments.aggregate(total=Sum('amount'))['total'] or 0
    total_revenue_inr = round(total_revenue_paise / 100, 2)
    
    today_start = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
    today_signups = User.objects.filter(date_joined__gte=today_start).count()
    today_resumes = Resume.objects.filter(created_at__gte=today_start).count()
    
    recent_users = []
    for u in User.objects.order_by('-date_joined')[:5]:
        avatar = ''
        if hasattr(u, 'profile') and u.profile.avatar_url:
            avatar = u.profile.avatar_url
        else:
            avatar = f"https://ui-avatars.com/api/?name={u.first_name or u.username}&background=4F46E5&color=fff&size=128"
        recent_users.append({
            'id': u.id,
            'name': f"{u.first_name} {u.last_name}".strip() or u.username,
            'email': u.email or f"{u.username}@example.com",
            'avatar': avatar,
            'date_joined': u.date_joined.isoformat(),
            'resumes_count': u.resumes.count()
        })

    return Response({
        'total_users': total_users,
        'total_resumes': total_resumes,
        'total_paid_orders': total_paid_orders,
        'total_revenue_inr': total_revenue_inr,
        'today_signups': today_signups,
        'today_resumes': today_resumes,
        'recent_users': recent_users
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def admin_users_view(request):
    """
    Returns full list of all registered users with their details and template creation history.
    Restricted to admin/staff users only.
    """
    admin_emails = [e.strip().lower() for e in os.getenv('ADMIN_EMAILS', '').split(',') if e.strip()]
    user_email = (request.user.email or '').strip().lower()
    if not (request.user.is_staff or request.user.is_superuser or user_email in admin_emails):
        return Response({'detail': 'Admin privileges required.'}, status=status.HTTP_403_FORBIDDEN)
    users = User.objects.all().order_by('-date_joined')
    result = []

    for u in users:
        avatar = ''
        if hasattr(u, 'profile') and u.profile.avatar_url:
            avatar = u.profile.avatar_url
        else:
            avatar = f"https://ui-avatars.com/api/?name={u.first_name or u.username}&background=4F46E5&color=fff&size=128"

        user_resumes = []
        for r in u.resumes.all().order_by('-created_at'):
            template_meta = TEMPLATE_METADATA.get(r.template_id, {"name": f"Template #{r.template_id}", "category": "Standard"})
            is_paid = ResumePayment.objects.filter(resume=r, status='paid').exists()
            user_resumes.append({
                'id': r.id,
                'title': r.title or 'Untitled Resume',
                'template_id': r.template_id,
                'template_name': template_meta['name'],
                'category': template_meta['category'],
                'is_master': r.is_master,
                'target_job_title': r.target_job_title or '',
                'target_company': r.target_company or '',
                'created_at': r.created_at.isoformat(),
                'updated_at': r.updated_at.isoformat(),
                'is_paid': is_paid
            })

        user_payments = ResumePayment.objects.filter(resume__user=u, status='paid')
        paid_amount = sum(p.amount for p in user_payments) / 100

        result.append({
            'id': u.id,
            'username': u.username,
            'name': f"{u.first_name} {u.last_name}".strip() or u.username,
            'email': u.email or f"{u.username}@example.com",
            'avatar': avatar,
            'date_joined': u.date_joined.isoformat(),
            'last_login': u.last_login.isoformat() if u.last_login else None,
            'resumes_count': len(user_resumes),
            'resumes': user_resumes,
            'total_paid_inr': paid_amount,
            'is_staff': u.is_staff
        })

    return Response(result)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def contact_submission_view(request):
    """
    Handle contact form inquiries from visitors and clients.
    """
    name = request.data.get('name', '').strip()
    email = request.data.get('email', '').strip()
    subject = request.data.get('subject', 'General Inquiry').strip()
    message = request.data.get('message', '').strip()
    category = request.data.get('category', 'Support').strip()

    if not name or not email or not message:
        return Response({'error': 'Name, email, and message are required.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({
        'success': True,
        'message': 'Thank you! Your inquiry has been received by the NextGen2AI team. We will reach out to you within 24 hours.',
        'ticket_id': f"NXG-{int(time.time())}"
    })



