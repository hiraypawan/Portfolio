"""Verify PDF page count, searchable text, identity, and required links."""
import json
from pathlib import Path
import sys
from pypdf import PdfReader

profile = json.load(sys.stdin)
pdf = PdfReader(Path(__file__).resolve().parents[1] / 'public' / 'Pawan-Hiray-Resume.pdf')
assert len(pdf.pages) == 1, 'The downloadable resume must be one page.'
text = '\n'.join(page.extract_text() for page in pdf.pages)
for expected in [profile['identity']['fullName'], profile['contact']['email'], 'AI Product Developer', 'Next.js', 'Expected 2026', *[project['name'] for project in profile['projects']]]:
    assert expected in text, f'Missing searchable PDF content: {expected}'
for stale in ['ServiceNow', '50+', '3+ years', '10,000+ users']:
    assert stale not in text, f'Stale / misleading PDF content: {stale}'
assert pdf.metadata.author == profile['identity']['fullName']
links = []
for page in pdf.pages:
    for reference in page.get('/Annots', []):
        annotation = reference.get_object()
        action = annotation.get('/A', {})
        if '/URI' in action: links.append(action['/URI'])
for expected in [profile['siteUrl'], 'https://github.com/hiraypawan', *[project['url'] for project in profile['projects']]]:
    assert expected in links, f'Missing PDF link: {expected}'
print(f'PDF verified: one page, searchable text, {len(links)} clickable links, synchronized project list.')
