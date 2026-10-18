from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Resume, PersonalInfo, Education, Experience,
    Project, Skill, Certification, Achievement,
    JobDescription, ATSAnalysis, Template,
    ResumePayment, UserProfile
)

class PersonalInfoInline(admin.StackedInline):
    model = PersonalInfo
    extra = 0
    can_delete = False

class ExperienceInline(admin.TabularInline):
    model = Experience
    extra = 0
    fields = ('company', 'role', 'start_date', 'end_date', 'is_current')

class EducationInline(admin.TabularInline):
    model = Education
    extra = 0
    fields = ('institution', 'degree', 'field_of_study', 'start_date', 'end_date')

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 0
    fields = ('category', 'skill_name')

class ProjectInline(admin.TabularInline):
    model = Project
    extra = 0
    fields = ('name', 'date', 'link')

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user_link', 'template_id', 'is_master', 'created_at', 'updated_at')
    list_filter = ('is_master', 'template_id', 'created_at')
    search_fields = ('title', 'user__username', 'user__email', 'target_job_title', 'target_company')
    date_hierarchy = 'created_at'
    inlines = [PersonalInfoInline, ExperienceInline, EducationInline, SkillInline, ProjectInline]

    def user_link(self, obj):
        return f"{obj.user.username} ({obj.user.email})"
    user_link.short_description = 'User'

@admin.register(PersonalInfo)
class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'phone', 'location', 'resume')
    search_fields = ('full_name', 'email', 'phone', 'location')

@admin.register(ResumePayment)
class ResumePaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_info', 'resume', 'amount_inr', 'status_badge', 'razorpay_order_id', 'razorpay_payment_id', 'created_at')
    list_filter = ('status', 'currency', 'created_at')
    search_fields = ('razorpay_order_id', 'razorpay_payment_id', 'user__username', 'user__email', 'resume__title')
    date_hierarchy = 'created_at'

    def user_info(self, obj):
        if obj.user:
            return f"{obj.user.username} ({obj.user.email})"
        return '-'
    user_info.short_description = 'User'

    def amount_inr(self, obj):
        return f"₹{obj.amount / 100:.2f}"
    amount_inr.short_description = 'Amount'

    def status_badge(self, obj):
        color = '#10B981' if obj.status == 'paid' else ('#EF4444' if obj.status == 'failed' else '#F59E0B')
        return format_html('<span style="color: {}; font-weight: bold; text-transform: uppercase;">{}</span>', color, obj.status)
    status_badge.short_description = 'Status'

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'phone', 'google_id', 'avatar_preview', 'created_at')
    search_fields = ('user__username', 'user__email', 'phone', 'google_id')

    def avatar_preview(self, obj):
        if obj.avatar_url:
            return format_html('<img src="{}" style="width: 32px; height: 32px; border-radius: 50%;" />', obj.avatar_url)
        return '-'
    avatar_preview.short_description = 'Avatar'

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('id', 'company', 'role', 'start_date', 'end_date', 'is_current', 'resume')
    search_fields = ('company', 'role', 'resume__title')
    list_filter = ('is_current',)

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('id', 'institution', 'degree', 'field_of_study', 'end_date', 'resume')
    search_fields = ('institution', 'degree', 'field_of_study')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'skill_name', 'category', 'resume')
    list_filter = ('category',)
    search_fields = ('skill_name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'date', 'link', 'resume')
    search_fields = ('name', 'description')

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'date', 'resume')
    search_fields = ('title',)

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'issuer', 'issue_date', 'resume')
    search_fields = ('name', 'issuer')

@admin.register(JobDescription)
class JobDescriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'company', 'user', 'created_at')
    search_fields = ('title', 'company', 'user__username')

@admin.register(ATSAnalysis)
class ATSAnalysisAdmin(admin.ModelAdmin):
    list_display = ('id', 'resume', 'overall_score', 'keyword_match_score', 'created_at')
    list_filter = ('overall_score', 'created_at')

@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'is_ats_safe')
