from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, ResumeViewSet, personal_info_detail,
    experience_list_create, experience_detail,
    education_list_create, education_detail,
    project_list_create, project_detail,
    skill_list_create, skill_detail,
    achievement_list_create, achievement_detail,
    generate_summary, improve_bullets,
    create_job_description, analyze_ats, optimize_for_job,
    list_templates, export_pdf, export_json_resume, import_json_resume,
    ai_autofill_role
)

router = DefaultRouter()
router.register('resumes', ResumeViewSet, basename='resume')

urlpatterns = [
    # Auth
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='auth-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    
    # Sub-resources
    path('resumes/<int:pk>/personal-info/', personal_info_detail, name='personal-info-detail'),
    path('resumes/<int:pk>/experience/', experience_list_create, name='experience-list-create'),
    path('resumes/<int:pk>/experience/<int:exp_pk>/', experience_detail, name='experience-detail'),
    path('resumes/<int:pk>/education/', education_list_create, name='education-list-create'),
    path('resumes/<int:pk>/education/<int:edu_pk>/', education_detail, name='education-detail'),
    path('resumes/<int:pk>/projects/', project_list_create, name='project-list-create'),
    path('resumes/<int:pk>/projects/<int:proj_pk>/', project_detail, name='project-detail'),
    path('resumes/<int:pk>/skills/', skill_list_create, name='skill-list-create'),
    path('resumes/<int:pk>/skills/<int:skill_pk>/', skill_detail, name='skill-detail'),
    path('resumes/<int:pk>/achievements/', achievement_list_create, name='achievement-list-create'),
    path('resumes/<int:pk>/achievements/<int:ach_pk>/', achievement_detail, name='achievement-detail'),
    
    # AI Actions
    path('resumes/<int:pk>/generate-summary/', generate_summary, name='generate-summary'),
    path('resumes/<int:pk>/improve-bullets/', improve_bullets, name='improve-bullets'),
    path('resumes/<int:pk>/optimize-for-job/', optimize_for_job, name='optimize-for-job'),
    path('resumes/<int:pk>/ai-autofill/', ai_autofill_role, name='ai-autofill-role'),

    
    # Job Description & ATS Analysis
    path('job-descriptions/', create_job_description, name='job-description-create'),
    path('ats/analyze/', analyze_ats, name='ats-analyze'),
    
    # Templates & PDF / JSON Export / Import
    path('templates/', list_templates, name='list-templates'),
    path('resumes/<int:pk>/export-pdf/', export_pdf, name='export-pdf'),
    path('resumes/<int:pk>/export-json/', export_json_resume, name='export-json-resume'),
    path('resumes/import-json/', import_json_resume, name='import-json-resume'),
    
    path('', include(router.urls)),
]

