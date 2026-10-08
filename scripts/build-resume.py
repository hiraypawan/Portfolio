"""Build the approved one-page PDF from the same data as /resume.

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
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer

profile = json.load(sys.stdin)
identity, contact, resume = profile['identity'], profile['contact'], profile['resume']
site = profile['siteUrl']
output = Path(__file__).resolve().parents[1] / 'public' / 'Pawan-Hiray-Resume.pdf'

styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=24, leading=27, textColor=colors.HexColor('#172030'), spaceAfter=5),
    'headline': ParagraphStyle('headline', fontName='Helvetica-Bold', fontSize=10.4, leading=14, spaceAfter=6),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.4, leading=12.5, alignment=TA_LEFT, textColor=colors.HexColor('#172030')),
    'small': ParagraphStyle('small', fontName='Helvetica', fontSize=8.4, leading=11, textColor=colors.HexColor('#435063')),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=9, leading=13, spaceBefore=11, spaceAfter=5, textColor=colors.HexColor('#435063')),
    'subhead': ParagraphStyle('subhead', fontName='Helvetica-Bold', fontSize=9.4, leading=13, spaceAfter=3),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.4, leading=12.5, leftIndent=10, firstLineIndent=-7, spaceAfter=3),
}

def paragraph(text, style='body'):
    return Paragraph(text, styles[style])

def link(url, label):
    return f'<link href="{escape(url, quote=True)}" color="#263c59"><u>{escape(label)}</u></link>'

story = [paragraph(escape(identity['fullName']), 'name'), paragraph(escape(resume['headline']), 'headline')]
linkedin = next(item['url'] for item in profile['socials'] if item['network'] == 'LinkedIn')
story += [paragraph('Mumbai, India | ' + link('tel:' + contact['phone'].replace('-', ''), contact['phone']) + ' | ' + link('mailto:' + contact['email'], contact['email']), 'small'), paragraph(link('https://github.com/hiraypawan', 'github.com/hiraypawan') + ' | ' + link(linkedin, 'LinkedIn') + ' | ' + link(site, 'pawanhiray.vercel.app'), 'small'), Spacer(1, 5), paragraph(escape(identity['availability']), 'small')]
story += [paragraph('SUMMARY', 'section'), paragraph(escape(resume['summary']))]
story.append(paragraph('SKILLS', 'section'))
for skill in resume['skills']:
    story.append(paragraph(f'<b>{escape(skill["label"])}:</b> {escape(skill["text"])}'))
story.append(paragraph('LEADERSHIP & COMMUNITY', 'section'))
story.append(paragraph(escape(resume['leadership']['title']) + ' | ' + escape(resume['leadership']['dates']), 'subhead'))
for bullet in resume['leadership']['bullets']:
    story.append(paragraph('• ' + escape(bullet), 'bullet'))
story.append(paragraph('SELECTED PROJECTS — AI-ASSISTED IMPLEMENTATION', 'section'))
for index, project in enumerate(profile['projects']):
    if index: story.append(Spacer(1, 6))
    story.append(paragraph(escape(project['name']) + ' — ' + escape(project['category']) + ' | ' + escape(project['dates']), 'subhead'))
    story.append(paragraph(escape(project['intervention'])))
    story.append(paragraph(escape(' · '.join(project['stack'])), 'small'))
    references = [link(site + '/work/' + project['id'], 'Case study')]
    if project['url'].startswith('https://'): references.append(link(project['url'], project['url'].removeprefix('https://')))
    if project['repository'].startswith('https://'): references.append(link(project['repository'], 'Source: ' + project['repository'].removeprefix('https://')))
    story.append(paragraph(' | '.join(references), 'small'))
story.append(paragraph('EDUCATION', 'section'))
for education in resume['education']:
    story.append(paragraph(f'<b>{escape(education["qualification"])}:</b> {escape(education["institution"])} ({escape(education["date"])})'))
story += [Spacer(1, 11), paragraph('Project implementations and community metrics are owner-reported. Followers are not platform users. Public project evidence: ' + link(site + '/work', site + '/work'), 'small')]

class OnePageDocument(SimpleDocTemplate):
    count = 0
    def afterPage(self):
        self.count += 1

with tempfile.NamedTemporaryFile(suffix='.pdf', delete=False) as temporary:
    filename = temporary.name
try:
    document = OnePageDocument(filename, pagesize=A4, rightMargin=34, leftMargin=34, topMargin=30, bottomMargin=28, title='Pawan Hiray — AI Product Developer', author=identity['fullName'], invariant=1)
    document.build(story)
    if document.count != 1:
        raise RuntimeError(f'Resume spans {document.count} pages; shorten the content before replacing the approved PDF.')
    output.write_bytes(Path(filename).read_bytes())
    print(f'Wrote synchronized one-page resume: {output}', file=sys.stderr)
finally:
    os.unlink(filename)
