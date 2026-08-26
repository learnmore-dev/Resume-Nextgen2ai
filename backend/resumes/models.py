from django.db import models
from django.contrib.auth.models import User

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resumes')
    title = models.CharField(max_length=255)
    is_master = models.BooleanField(default=False)
    parent_resume = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='tailored_resumes')
    template_id = models.IntegerField(default=1)
    target_job_title = models.CharField(max_length=255, blank=True, null=True)
    target_company = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.user.username})"

class PersonalInfo(models.Model):
    resume = models.OneToOneField(Resume, on_delete=models.CASCADE, related_name='personal_info')
    full_name = models.CharField(max_length=255, blank=True, default='')
    email = models.EmailField(max_length=255, blank=True, default='')
    phone = models.CharField(max_length=50, blank=True, default='')
    location = models.CharField(max_length=255, blank=True, default='')
    linkedin_url = models.URLField(max_length=255, blank=True, default='')
    github_url = models.URLField(max_length=255, blank=True, default='')
    portfolio_url = models.URLField(max_length=255, blank=True, default='')
    summary = models.TextField(blank=True, default='')

class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='education')
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255, blank=True, default='')
    start_date = models.CharField(max_length=50, blank=True, default='')
    end_date = models.CharField(max_length=50, blank=True, default='')
    grade = models.CharField(max_length=50, blank=True, default='')
    order_index = models.IntegerField(default=0)

class Experience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='experience')
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    start_date = models.CharField(max_length=50, blank=True, default='')
    end_date = models.CharField(max_length=50, blank=True, default='')
    is_current = models.BooleanField(default=False)
    raw_description = models.TextField(blank=True, default='')
    bullets = models.JSONField(default=list, blank=True)
    order_index = models.IntegerField(default=0)

class Project(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    tech_stack = models.JSONField(default=list, blank=True)
    link = models.URLField(max_length=255, blank=True, default='')
    bullets = models.JSONField(default=list, blank=True)
    order_index = models.IntegerField(default=0)

class Skill(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='skills')
    category = models.CharField(max_length=100, default='Technical')
    skill_name = models.CharField(max_length=255)

class Certification(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='certifications')
    name = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255, blank=True, default='')
    issue_date = models.CharField(max_length=50, blank=True, default='')
    credential_url = models.URLField(max_length=255, blank=True, default='')

class Achievement(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=255)
    date = models.CharField(max_length=50, blank=True, default='')
    order_index = models.IntegerField(default=0)

class JobDescription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_descriptions')
    title = models.CharField(max_length=255, blank=True, default='')
    company = models.CharField(max_length=255, blank=True, default='')
    raw_text = models.TextField()
    extracted_keywords = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class ATSAnalysis(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='ats_analyses')
    job_description = models.ForeignKey(JobDescription, on_delete=models.CASCADE, related_name='ats_analyses')
    overall_score = models.FloatField(default=0.0)
    keyword_match_score = models.FloatField(default=0.0)
    skills_match_score = models.FloatField(default=0.0)
    job_title_match_score = models.FloatField(default=0.0)
    experience_relevance_score = models.FloatField(default=0.0)
    education_score = models.FloatField(default=0.0)
    structure_score = models.FloatField(default=0.0)
    formatting_score = models.FloatField(default=0.0)
    matched_keywords = models.JSONField(default=list, blank=True)
    missing_keywords = models.JSONField(default=list, blank=True)
    suggestions = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Template(models.Model):
    name = models.CharField(max_length=100)
    is_ats_safe = models.BooleanField(default=True)
    preview_image = models.CharField(max_length=255, blank=True, default='')
    html_path = models.CharField(max_length=255, blank=True, default='')
