"""Build the one-page PDF from the exact data used by /resume.

Install scripts/requirements-pdf.txt, then run npm run resume:pdf.
No independent credential, metric, or testimonial is added here.
"""
import json
import os
from pathlib import Path
import sys
import tempfile
from html import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

profile = json.load(sys.stdin)
identity, contact, resume = profile['identity'], profile['contact'], profile['resume']
site = profile['siteUrl']
output = Path(__file__).resolve().parents[1] / 'public' / 'Pawan-Hiray-Resume.pdf'
ink = colors.HexColor('#172030')
muted = colors.HexColor('#4b596c')
accent = colors.HexColor('#485a78')
hairline = colors.HexColor('#d9dee7')

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=24, leading=26, textColor=ink),
    'headline': ParagraphStyle('headline', fontName='Helvetica-Bold', fontSize=10.5, leading=13, textColor=ink),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.1, leading=12, alignment=TA_LEFT, textColor=ink),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8.1, leading=10.5, textColor=muted),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=8.4, leading=11, spaceBefore=8, spaceAfter=3, textColor=accent, tracking=0.8),
    'subhead': ParagraphStyle('subhead', fontName='Helvetica-Bold', fontSize=9.2, leading=12, textColor=ink),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=8.1, leading=10, textColor=muted),
    'date': ParagraphStyle('date', fontName='Helvetica', fontSize=8.1, leading=10, alignment=TA_RIGHT, textColor=muted),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.0, leading=11.7, leftIndent=10, firstLineIndent=-7, spaceAfter=2),
}


def paragraph(text, style='body'):
    return Paragraph(text, styles[style])


def link(url, label):
    return f'<link href="{escape(url, quote=True)}" color="#263c59"><u>{escape(label)}</u></link>'


def section_title(label):
    return KeepTogether([
        paragraph(escape(label.upper()), 'section'),
        HRFlowable(width='100%', thickness=0.55, color=hairline, spaceAfter=4),
    ])


def dated_heading(title, subtitle, date):
    table = Table(
        [[paragraph(escape(title), 'subhead'), paragraph(escape(date), 'date')],
         [paragraph(escape(subtitle), 'role'), '']],
        colWidths=[138 * mm, 42 * mm],
        hAlign='LEFT',
    )
    table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('SPAN', (1, 0), (1, 1)),
    ]))
    return table


linkedin = next(item['url'] for item in profile['socials'] if item['network'] == 'LinkedIn')
story = [
    paragraph(escape(identity['fullName']), 'name'),
    Spacer(1, 2),
    paragraph(escape(resume['headline']), 'headline'),
    Spacer(1, 5),
    paragraph(
        'Mumbai, India &nbsp;·&nbsp; '
        + link('tel:' + ''.join(character for character in contact['phone'] if character.isdigit() or character == '+'), contact['phone'])
        + ' &nbsp;·&nbsp; '
        + link('mailto:' + contact['email'], contact['email']),
        'small',
    ),
    paragraph(
        link('https://github.com/hiraypawan', 'github.com/hiraypawan')
        + ' &nbsp;·&nbsp; '
        + link(linkedin, 'LinkedIn')
        + ' &nbsp;·&nbsp; '
        + link(site, 'pawanhiray.vercel.app'),
        'small',
    ),
    Spacer(1, 4),
    paragraph(escape(identity['availability']), 'small'),
    section_title('Summary'),
    paragraph(escape(resume['summary'])),
    section_title('Skills'),
]

for skill in resume['skills']:
    story.append(paragraph(f'<b>{escape(skill["label"])}:</b> {escape(skill["text"])}'))

story += [
    section_title('Leadership & community'),
    dated_heading(
        resume['leadership']['title'],
        'Product workflows, platform UX, implementation, and community adoption',
        resume['leadership']['dates'],
    ),
    Spacer(1, 3),
]
for bullet in resume['leadership']['bullets']:
    story.append(paragraph('- ' + escape(bullet), 'bullet'))

story.append(section_title('Selected projects'))
for index, project in enumerate(profile['projects']):
    references = [link(site + '/work/' + project['id'], 'Case study')]
    if project['url'].startswith('https://'):
        references.append(link(project['url'], 'Live project'))
    if project['repository'].startswith('https://'):
        references.append(link(project['repository'], 'Source code'))
    block = [
        dated_heading(project['name'], project['role'] + ' · ' + project['category'], project['dates']),
        Spacer(1, 2),
        paragraph(escape(project['intervention'])),
        paragraph('<b>Outcome:</b> ' + escape(project['outcome']), 'small'),
        paragraph(escape(' · '.join(project['stack'])), 'small'),
        paragraph(' &nbsp;|&nbsp; '.join(references), 'small'),
    ]
    if index:
        story.append(Spacer(1, 5))
    story.append(KeepTogether(block))

story.append(section_title('Education'))
for education in resume['education']:
    story.append(
        paragraph(
            f'<b>{escape(education["qualification"])}</b> — '
            f'{escape(education["institution"])} ({escape(education["date"])})'
        )
    )
story += [
    Spacer(1, 7),
    HRFlowable(width='100%', thickness=0.55, color=hairline, spaceAfter=4),
    paragraph(
        'Portfolio, public project links, and implementation notes: '
        + link(site + '/work', 'pawanhiray.vercel.app/work')
        + '. Community audience and product usage are reported separately.',
        'small',
    ),
]


class OnePageDocument(SimpleDocTemplate):
    count = 0

    def afterPage(self):
        self.count += 1


with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as temporary:
    filename = temporary.name
try:
    document = OnePageDocument(
        filename,
        pagesize=A4,
        rightMargin=15 * mm,
        leftMargin=15 * mm,
        topMargin=11 * mm,
        bottomMargin=10 * mm,
        title='Pawan Hiray — AI Product Developer',
        author=identity['fullName'],
        subject='Resume and selected product work',
        invariant=1,
    )
    document.build(story)
    if document.count != 1:
        raise RuntimeError(
            f'Resume spans {document.count} pages; shorten the content before replacing the approved PDF.'
        )
    output.write_bytes(Path(filename).read_bytes())
    print(f'Wrote synchronized one-page resume: {output}', file=sys.stderr)
finally:
    os.unlink(filename)
