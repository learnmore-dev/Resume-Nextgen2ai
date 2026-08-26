import os
from io import BytesIO
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ASSETS_DIR = os.path.join(os.path.dirname(__file__), 'assets')
PHONE_ICON = os.path.join(ASSETS_DIR, 'phone.png')
EMAIL_ICON = os.path.join(ASSETS_DIR, 'email.png')
LOC_ICON = os.path.join(ASSETS_DIR, 'location.png')
LINKEDIN_ICON = os.path.join(ASSETS_DIR, 'linkedin.png')
GITHUB_ICON = os.path.join(ASSETS_DIR, 'github.png')
PORTFOLIO_ICON = os.path.join(ASSETS_DIR, 'portfolio.png')


def safe(value):
    """Make user-entered values safe for ReportLab's mini-HTML paragraphs."""
    return escape(str(value or ''))


def generate_pdf_bytes(resume_obj) -> bytes:
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=0.35 * inch,
        rightMargin=0.35 * inch,
        topMargin=0.35 * inch,
        bottomMargin=0.35 * inch
    )
    styles = getSampleStyleSheet()

    # Exact Balanced Typography & Spacing to Fill 100% of 1 Single Page
    title_style = ParagraphStyle(
        'ResumeTitleCenter',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=20,
        leading=23,
        alignment=1,
        textColor=colors.HexColor('#000000')
    )

    contact_style = ParagraphStyle(
        'ResumeContactCenter',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=13.5,
        alignment=1,
        textColor=colors.HexColor('#000000')
    )

    heading_style = ParagraphStyle(
        'ResumeSectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10.5,
        leading=13.5,
        textColor=colors.HexColor('#000000'),
        spaceBefore=7,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'ResumeBodyText',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.2,
        leading=12.8,
        textColor=colors.HexColor('#1A1A1A')
    )

    bullet_style = ParagraphStyle(
        'ResumeBulletText',
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    right_bold_style = ParagraphStyle(
        'ResumeRightBold',
        parent=body_style,
        fontName='Times-Bold',
        fontSize=9.2,
        alignment=2,
        textColor=colors.HexColor('#000000')
    )

    story = []
    p_info = getattr(resume_obj, 'personal_info', None)
    name = p_info.full_name if p_info and p_info.full_name else resume_obj.title or "Manisha Chauhan"

    # Header Name
    story.append(Paragraph(safe(name), title_style))
    story.append(Spacer(1, 3))

    # Contact Details Line with Exact Brand Icons
    if p_info:
        fields = []
        if p_info.phone:
            fields.append(f'<img src="{PHONE_ICON}" width="8.5" height="8.5" valign="middle"/> &nbsp;<b>{safe(p_info.phone)}</b>')
        if p_info.email:
            fields.append(f'<img src="{EMAIL_ICON}" width="8.5" height="8.5" valign="middle"/> &nbsp;<u><a href="mailto:{safe(p_info.email)}">{safe(p_info.email)}</a></u>')
        if p_info.location:
            fields.append(f'<img src="{LOC_ICON}" width="8.5" height="8.5" valign="middle"/> &nbsp;{safe(p_info.location)}')
        if p_info.linkedin_url:
            fields.append(f'<img src="{LINKEDIN_ICON}" width="8.5" height="8.5" valign="middle"/> &nbsp;<u><a href="{safe(p_info.linkedin_url)}">Linkedin</a></u>')
        if p_info.github_url:
            fields.append(f'<img src="{GITHUB_ICON}" width="8.5" height="8.5" valign="middle"/> &nbsp;<u><a href="{safe(p_info.github_url)}">Github</a></u>')
        if p_info.portfolio_url:
            fields.append(f'<img src="{PORTFOLIO_ICON}" width="8.5" height="8.5" valign="middle"/> &nbsp;<u><a href="{safe(p_info.portfolio_url)}">Portfolio</a></u>')

        contact_line = ' &nbsp;|&nbsp; '.join(fields)
        if contact_line:
            story.append(Paragraph(contact_line, contact_style))
            story.append(Spacer(1, 4))

    def add_section_header(title_text):
        story.append(Paragraph(title_text, heading_style))
        story.append(HRFlowable(width='100%', thickness=1, color=colors.HexColor('#000000'), spaceBefore=1, spaceAfter=4))

    # 1. Summary Section
    if p_info and p_info.summary:
        add_section_header('Summary')
        story.append(Paragraph(safe(p_info.summary), body_style))
        story.append(Spacer(1, 4))

    # 2. Experience Section
    experiences = resume_obj.experience.all()
    if experiences.exists():
        add_section_header('Experience')
        for item in experiences:
            dates = f'{safe(item.start_date)} - {"Present" if item.is_current else safe(item.end_date)}'
            company_part = f' | <i>{safe(item.company)}</i>' if item.company else ''
            left_text = f'<b>{safe(item.role)}</b>{company_part}'
            
            table = Table([[Paragraph(left_text, body_style), Paragraph(dates, right_bold_style)]], colWidths=[5.6 * inch, 2.2 * inch])
            table.setStyle(TableStyle([
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 0),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 0)
            ]))
            story.append(table)
            
            if item.bullets:
                for b in item.bullets:
                    story.append(Paragraph(f'&bull; &nbsp;{safe(b)}', bullet_style))
            elif item.raw_description:
                story.append(Paragraph(safe(item.raw_description), body_style))
            story.append(Spacer(1, 3))

    # 3. Projects Section
    projects = resume_obj.projects.all()
    if projects.exists():
        add_section_header('Projects')
        for item in projects:
            tech = safe(', '.join(item.tech_stack)) if isinstance(item.tech_stack, list) else safe(item.tech_stack or '')
            tech_part = f' | <i>{tech}</i>' if tech else ''
            link_part = f' | <u><a href="{safe(item.link)}">Link</a></u>' if item.link else ''
            left_text = f'<b>{safe(item.name)}</b>{tech_part}{link_part}'
            dates = 'Dec 2025 - Jan 2026'

            table = Table([[Paragraph(left_text, body_style), Paragraph(dates, right_bold_style)]], colWidths=[5.6 * inch, 2.2 * inch])
            table.setStyle(TableStyle([
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 0),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 0)
            ]))
            story.append(table)

            if item.bullets:
                for b in item.bullets:
                    story.append(Paragraph(f'&bull; &nbsp;{safe(b)}', bullet_style))
            elif item.description:
                story.append(Paragraph(f'&bull; &nbsp;{safe(item.description)}', bullet_style))
            story.append(Spacer(1, 3))

    # 4. Education Section
    add_section_header('Education')
    education = resume_obj.education.all()
    if education.exists():
        for item in education:
            degree_text = f'<b>{safe(item.degree)}</b>' + (f' - {safe(item.field_of_study)}' if item.field_of_study and item.field_of_study not in item.degree else '')
            dates = f'{safe(item.start_date)} - {safe(item.end_date)}' if item.start_date else safe(item.end_date)
            
            table = Table([[Paragraph(degree_text, body_style), Paragraph(dates, right_bold_style)]], colWidths=[5.6 * inch, 2.2 * inch])
            table.setStyle(TableStyle([
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 0),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 0)
            ]))
            story.append(table)
            if item.institution:
                story.append(Paragraph(f'<i>{safe(item.institution)}</i>', body_style))
            story.append(Spacer(1, 3))
    else:
        edu_defaults = [
            ("Bachelor of Technology (B.Tech.) — CSE | CGPA: 9.2/10", "Indus Institute of Technology, Ahmedabad", "Sep 2022 – May 2026"),
            ("Intermediate (Class 12) — 81%", "Shri Raghubir High School, Palghar", "Jun 2021 – May 2022")
        ]
        for degree, inst, dates in edu_defaults:
            table = Table([[Paragraph(f'<b>{degree}</b>', body_style), Paragraph(dates, right_bold_style)]], colWidths=[5.6 * inch, 2.2 * inch])
            table.setStyle(TableStyle([
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 0),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 0)
            ]))
            story.append(table)
            story.append(Paragraph(f'<i>{inst}</i>', body_style))
            story.append(Spacer(1, 3))
    story.append(Spacer(1, 3))

    # 5. Skills Section
    skills = resume_obj.skills.all()
    if skills.exists():
        add_section_header('Skills')
        for item in skills:
            cat_part = f'<b>{safe(item.category)}:</b> ' if item.category else ''
            skill_line = f'&bull; &nbsp;{cat_part}{safe(item.skill_name)}'
            story.append(Paragraph(skill_line, bullet_style))
        story.append(Spacer(1, 3))

    # 6. Achievements Section (With fallback if empty)
    add_section_header('Achievements')
    achievements = resume_obj.achievements.all()
    if achievements.exists():
        for item in achievements:
            table = Table([[Paragraph(f'&bull; &nbsp;{safe(item.title)}', bullet_style), Paragraph(safe(item.date), right_bold_style)]], colWidths=[5.6 * inch, 2.2 * inch])
            table.setStyle(TableStyle([
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 0),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 0)
            ]))
            story.append(table)
    else:
        ach_defaults = [
            ("Top 15 - HackHazards Hackathon 2025 (Fluvio Track) for DevNest AI.", "May 2025"),
            ("Solved 500+ DSA problems on LeetCode & GeeksforGeeks using Java.", "Oct 2024 - Jan 2026")
        ]
        for ach_title, ach_date in ach_defaults:
            table = Table([[Paragraph(f'&bull; &nbsp;{ach_title}', bullet_style), Paragraph(ach_date, right_bold_style)]], colWidths=[5.6 * inch, 2.2 * inch])
            table.setStyle(TableStyle([
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 0),
                ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                ('TOPPADDING', (0, 0), (-1, -1), 0),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 0)
            ]))
            story.append(table)

    doc.build(story)
    return buffer.getvalue()
