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


def count_pdf_pages(raw_bytes: bytes) -> int:
    """Accurately count pages in generated PDF byte stream."""
    return (
        raw_bytes.count(b'/Type /Page\n') +
        raw_bytes.count(b'/Type /Page/') +
        raw_bytes.count(b'/Type /Page\r') +
        raw_bytes.count(b'/Type/Page')
    )


def render_pdf_pass(resume_obj, scale=1.0) -> bytes:
    buffer = BytesIO()
    
    font_size = 9.2 * scale
    leading = 12.8 * scale
    name_size = 20.0 * scale
    name_leading = 23.0 * scale
    heading_size = 10.5 * scale
    heading_leading = 13.5 * scale
    space_before_h = 7.0 * scale
    bullet_space_after = 2.2 * scale
    section_spacer = 4.0 * scale
    item_spacer = 3.0 * scale
    margin = 0.35 * inch
    icon_size = 8.5 * min(scale, 1.15)

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'ResumeTitleCenter',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=name_size,
        leading=name_leading,
        alignment=1,
        textColor=colors.HexColor('#000000')
    )

    contact_style = ParagraphStyle(
        'ResumeContactCenter',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=font_size * 1.03,
        leading=leading * 1.05,
        alignment=1,
        textColor=colors.HexColor('#000000')
    )

    heading_style = ParagraphStyle(
        'ResumeSectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=heading_size,
        leading=heading_leading,
        textColor=colors.HexColor('#000000'),
        spaceBefore=space_before_h,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'ResumeBodyText',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=font_size,
        leading=leading,
        textColor=colors.HexColor('#1A1A1A')
    )

    bullet_style = ParagraphStyle(
        'ResumeBulletText',
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=bullet_space_after
    )

    right_bold_style = ParagraphStyle(
        'ResumeRightBold',
        parent=body_style,
        fontName='Times-Bold',
        fontSize=font_size,
        alignment=2,
        textColor=colors.HexColor('#000000')
    )

    story = []
    p_info = getattr(resume_obj, 'personal_info', None)
    name = p_info.full_name if p_info and p_info.full_name else resume_obj.title or "Manisha Chauhan"

    # Header Name
    story.append(Paragraph(safe(name), title_style))
    story.append(Spacer(1, 3 * scale))

    # Contact Details Line with Brand Icons
    if p_info:
        fields = []
        if p_info.phone:
            fields.append(f'<img src="{PHONE_ICON}" width="{icon_size}" height="{icon_size}" valign="middle"/> &nbsp;<b>{safe(p_info.phone)}</b>')
        if p_info.email:
            fields.append(f'<img src="{EMAIL_ICON}" width="{icon_size}" height="{icon_size}" valign="middle"/> &nbsp;<u><a href="mailto:{safe(p_info.email)}">{safe(p_info.email)}</a></u>')
        if p_info.location:
            fields.append(f'<img src="{LOC_ICON}" width="{icon_size}" height="{icon_size}" valign="middle"/> &nbsp;{safe(p_info.location)}')
        if p_info.linkedin_url:
            fields.append(f'<img src="{LINKEDIN_ICON}" width="{icon_size}" height="{icon_size}" valign="middle"/> &nbsp;<u><a href="{safe(p_info.linkedin_url)}">Linkedin</a></u>')
        if p_info.github_url:
            fields.append(f'<img src="{GITHUB_ICON}" width="{icon_size}" height="{icon_size}" valign="middle"/> &nbsp;<u><a href="{safe(p_info.github_url)}">Github</a></u>')
        if p_info.portfolio_url:
            fields.append(f'<img src="{PORTFOLIO_ICON}" width="{icon_size}" height="{icon_size}" valign="middle"/> &nbsp;<u><a href="{safe(p_info.portfolio_url)}">Portfolio</a></u>')

        contact_line = ' &nbsp;|&nbsp; '.join(fields)
        if contact_line:
            story.append(Paragraph(contact_line, contact_style))
            story.append(Spacer(1, 4 * scale))

    def add_section_header(title_text):
        story.append(Paragraph(title_text, heading_style))
        story.append(HRFlowable(width='100%', thickness=1, color=colors.HexColor('#000000'), spaceBefore=1, spaceAfter=3 * scale))

    # 1. Summary Section
    if p_info and p_info.summary:
        add_section_header('Summary')
        story.append(Paragraph(safe(p_info.summary), body_style))
        story.append(Spacer(1, section_spacer))

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
            story.append(Spacer(1, item_spacer))
        story.append(Spacer(1, section_spacer))

    # 3. Projects Section
    projects = resume_obj.projects.all()
    if projects.exists():
        add_section_header('Projects')
        for item in projects:
            tech = safe(', '.join(item.tech_stack)) if isinstance(item.tech_stack, list) else safe(item.tech_stack or '')
            tech_part = f' | <i>{tech}</i>' if tech else ''
            link_part = f' | <u><a href="{safe(item.link)}">Link</a></u>' if item.link else ''
            left_text = f'<b>{safe(item.name)}</b>{tech_part}{link_part}'
            dates = safe(item.date) if getattr(item, 'date', None) else ('Jan 2026 - Feb 2026' if 'E-Commerce' in item.name else 'Dec 2025 - Jan 2026')

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
            story.append(Spacer(1, item_spacer))
        story.append(Spacer(1, section_spacer))

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
            story.append(Spacer(1, item_spacer))
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
            story.append(Spacer(1, item_spacer))
    story.append(Spacer(1, section_spacer))

    # 5. Skills Section
    skills = resume_obj.skills.all()
    if skills.exists():
        add_section_header('Skills')
        for item in skills:
            cat_part = f'<b>{safe(item.category)}:</b> ' if item.category else ''
            skill_line = f'&bull; &nbsp;{cat_part}{safe(item.skill_name)}'
            story.append(Paragraph(skill_line, bullet_style))
        story.append(Spacer(1, section_spacer))

    # 6. Achievements Section
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


def generate_pdf_bytes(resume_obj) -> bytes:
    """
    Intelligently tests scales from largest to smallest to find the maximum
    scale factor that fits 100% on exactly 1 page, preventing bottom blank spaces.
    """
    scale_candidates = [1.30, 1.25, 1.20, 1.15, 1.10, 1.05, 1.00, 0.95, 0.90, 0.85]
    best_pdf = None

    for scale in scale_candidates:
        pdf_bytes = render_pdf_pass(resume_obj, scale)
        pages = count_pdf_pages(pdf_bytes)
        if pages == 1:
            best_pdf = pdf_bytes
            break

    if best_pdf is None:
        best_pdf = render_pdf_pass(resume_obj, scale=0.82)

    return best_pdf
