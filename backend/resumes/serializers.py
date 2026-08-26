from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Resume, PersonalInfo, Education, Experience,
    Project, Skill, Certification, Achievement, JobDescription,
    ATSAnalysis, Template
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class PersonalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInfo
        fields = '__all__'
        read_only_fields = ('resume',)

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'
        read_only_fields = ('resume',)

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
        read_only_fields = ('resume',)

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('resume',)

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'
        read_only_fields = ('resume',)

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'
        read_only_fields = ('resume',)

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'
        read_only_fields = ('resume',)

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = '__all__'

class ResumeListSerializer(serializers.ModelSerializer):
    parent_resume_title = serializers.CharField(source='parent_resume.title', read_only=True)
    
    class Meta:
        model = Resume
        fields = ('id', 'title', 'is_master', 'parent_resume', 'parent_resume_title', 'template_id', 'target_job_title', 'target_company', 'created_at', 'updated_at')

class ResumeDetailSerializer(serializers.ModelSerializer):
    personal_info = PersonalInfoSerializer(read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    certifications = CertificationSerializer(many=True, read_only=True)
    achievements = AchievementSerializer(many=True, read_only=True)
    parent_resume_title = serializers.CharField(source='parent_resume.title', read_only=True)

    class Meta:
        model = Resume
        fields = (
            'id', 'user', 'title', 'is_master', 'parent_resume', 'parent_resume_title',
            'template_id', 'target_job_title', 'target_company', 'created_at', 'updated_at',
            'personal_info', 'education', 'experience', 'projects', 'skills', 'certifications', 'achievements'
        )
        read_only_fields = ('user',)

class JobDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobDescription
        fields = '__all__'
        read_only_fields = ('user',)

class ATSAnalysisSerializer(serializers.ModelSerializer):
    job_description_title = serializers.CharField(source='job_description.title', read_only=True)
    
    class Meta:
        model = ATSAnalysis
        fields = '__all__'
