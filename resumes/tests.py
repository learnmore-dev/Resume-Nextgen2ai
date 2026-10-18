from django.test import TestCase
from django.contrib.auth.models import User
from resumes.models import Resume, PersonalInfo, Experience, Skill, JobDescription, ATSAnalysis
from ats.engine import analyze_resume
from ai_engine.service import improve_bullets_ai, generate_summary_ai

class ResumeBuilderTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123', email='test@example.com')
        self.master_resume = Resume.objects.create(
            user=self.user,
            title='Master Resume',
            is_master=True
        )
        PersonalInfo.objects.create(
            resume=self.master_resume,
            full_name='Rahul Sharma',
            email='rahul@example.com',
            phone='+91 9876543210',
            location='Bangalore, India',
            summary='Experienced Full Stack Engineer with 4 years in Python and React.'
        )
        Experience.objects.create(
            resume=self.master_resume,
            company='Tech Solutions',
            role='Senior Developer',
            start_date='2022',
            end_date='Present',
            is_current=True,
            raw_description='Built microservices with Django and reduced API latency by 35%.',
            bullets=['Spearheaded Django microservices architecture reducing API latency by 35%.']
        )
        Skill.objects.create(resume=self.master_resume, category='Technical', skill_name='Python')
        Skill.objects.create(resume=self.master_resume, category='Technical', skill_name='Django')
        Skill.objects.create(resume=self.master_resume, category='Technical', skill_name='React')

        self.jd = JobDescription.objects.create(
            user=self.user,
            title='Senior Python Developer',
            company='Acme Corp',
            raw_text='We are looking for a Senior Python Developer with Django, REST API, React, Docker, and PostgreSQL expertise.',
            extracted_keywords={'required_skills': ['Python', 'Django', 'REST API', 'React', 'Docker'], 'job_title': 'Senior Python Developer'}
        )

    def test_ats_analysis_calculation(self):
        result = analyze_resume(self.master_resume, self.jd)
        self.assertGreater(result['overall_score'], 50.0)
        self.assertIn('Python', result['matched_keywords'])
        self.assertIn('Docker', result['missing_keywords'])

    def test_ai_bullet_improvement(self):
        raw = "Fixed bugs and created database tables for 500k users."
        improved = improve_bullets_ai(raw, ['Docker', 'PostgreSQL'])
        self.assertTrue(len(improved) > 0)
        # Verify metric preservation
        self.assertTrue(any('500k' in b for b in improved))

    def test_child_resume_branching(self):
        child = Resume.objects.create(
            user=self.user,
            title='Tailored for Acme Corp',
            is_master=False,
            parent_resume=self.master_resume
        )
        self.assertEqual(child.parent_resume.id, self.master_resume.id)
        self.assertFalse(child.is_master)
