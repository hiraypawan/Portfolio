import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ownerProfile } from '../../src/data/ownerProfile';

const origin = 'https://pawanhiray.vercel.app';

test('raw server HTML contains the OS portfolio, projects, navigation, and preview metadata', async ({
  request,
}) => {
  const response = await request.get('/');
  expect(response.status()).toBe(200);
  const html = await response.text();
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
  for (const text of [
    'AI Product Developer',
    'PawanOS / Portfolio',
    'Pawan Hiray',
    'OneBrain',
    'MUStudentsUnited',
    'Smarty',
    'Next.js',
  ])
    expect(main).toContain(text);
  for (const path of ['/work', '/about', '/resume', '/contact'])
    expect(html).toContain(`href="${path}"`);
  expect(html).toContain('name="description"');
  expect(html).toContain('property="og:image"');
  expect(html).toContain('name="twitter:image"');
  expect(html).not.toContain('projects · results · proof · contact');
  const bot = await request.get('/', { headers: { 'user-agent': 'facebookexternalhit/1.1' } });
  expect(await bot.text()).toContain('AI Product');
});

test('home, work, case study, resume, and contact work with JavaScript disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('AI Product Developer');
  await expect(page.getByRole('link', { name: 'Resume', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'OneBrain', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'OneBrain', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Architecture & workflow' })).toBeVisible();
  await page.goto('/resume');
  await expect(page.getByRole('heading', { name: 'Pawan Hiray', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download PDF' })).toBeVisible();
  await page.goto('/contact');
  await expect(
    page.getByRole('link', { name: 'pawanhiray1@gmail.com', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.contact-builder')).toBeHidden();
  await page.goto('/os');
  await expect(
    page.getByRole('heading', { name: 'Pawan Hiray — AI Product Developer' }),
  ).toBeVisible();
  await expect(page.locator('.personal-os')).toBeHidden();
  await context.close();
});

test('the main page is PawanOS with desktop and mobile-native chrome', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.personal-os')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'I’m Pawan.' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Dock' })).toBeVisible();
  await expect(page.locator('.os-system-brand')).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.os-dynamic-island')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search apps and projects' })).toBeVisible();
  await expect(page.locator('.os-home-indicator')).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
  ).toBe(true);
});

test('route metadata, sitemap, AI text, social image and PDF are served', async ({ request }) => {
  for (const path of ['/work', '/about', '/resume', '/contact', '/os', '/work/onebrain']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(`rel="canonical" href="${origin}${path}"`);
  }
  const map = await (await request.get('/sitemap.xml')).text();
  expect(map).toContain(`${origin}/work/onebrain`);
  expect(map).toContain(`${origin}/resume`);
  const ai = await (await request.get('/llms.txt')).text();
  expect(ai).toContain('August 2024–March 2026');
  expect(ai).not.toContain('50+');
  expect(ai).not.toContain('Live: #');
  expect(ai).toContain(`[Work](${origin}/work)`);
  expect(ai).toContain(`[OneBrain](${origin}/work/onebrain)`);
  const og = await request.get('/opengraph-image');
  expect(og.ok()).toBe(true);
  expect(og.headers()['content-type']).toContain('image/png');
  expect((await og.body()).subarray(1, 4).toString()).toBe('PNG');
  const pdf = await request.get('/Pawan-Hiray-Resume.pdf');
  expect(pdf.ok()).toBe(true);
  expect((await pdf.body()).subarray(0, 4).toString()).toBe('%PDF');
  expect((await request.get('/work/not-a-project')).status()).toBe(404);
});

for (const path of ['/', '/work', '/about', '/resume', '/contact', '/work/onebrain']) {
  test(`accessibility: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test('home and reading routes do not overflow on mobile, tablet, or short desktop', async ({
  page,
}) => {
  test.setTimeout(60_000);
  for (const viewport of [
    { width: 320, height: 640 },
    { width: 390, height: 844 },
    { width: 640, height: 700 },
    { width: 768, height: 600 },
    { width: 1024, height: 600 },
  ]) {
    await page.setViewportSize(viewport);
    for (const path of [
      '/',
      '/work',
      '/about',
      '/resume',
      '/contact',
      ...ownerProfile.projects.map((project) => `/work/${project.id}`),
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        `${path} at ${viewport.width}px must not overflow`,
      ).toBe(true);
      await expect(page.locator('main')).toBeVisible();
    }
  }
});

test('contact keeps a complete editable brief and makes no server submission', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Your name').fill('A & B #1');
  await page.getByLabel('Email (required)').fill('person+tag@example.com');
  await page.getByLabel('Role / team').fill('AI & automation');
  await page
    .getByLabel('Context & what success looks like')
    .fill('A role with TypeScript & AI. ₹20k–₹30k is not a query parameter.');
  await expect(page.getByLabel('Budget / range')).toHaveCount(0);
  await page.getByRole('button', { name: 'Prepare email brief' }).click();
  await expect(page.getByText('Your brief is ready — it has not been sent.')).toBeVisible();
  await expect(page.getByLabel('Your email draft')).toContainText('A & B #1');
  const mailto = await page.getByRole('link', { name: 'Open email app' }).getAttribute('href');
  expect(new URL(mailto!).searchParams.get('body')).toContain('₹20k–₹30k');
  await page.getByRole('button', { name: 'Edit brief' }).click();
  await expect(page.getByLabel('Your name')).toHaveValue('A & B #1');
});

test('minimizing preserves a contact draft and Escape closes only the palette', async ({
  page,
}) => {
  await page.goto('/os');
  await page.getByRole('button', { name: 'Open Contact: Hiring & project inquiries' }).click();
  const contact = page.getByRole('dialog', { name: 'Contact', exact: true });
  await contact.getByLabel('Your name').fill('Draft survives');
  await contact.getByRole('button', { name: 'Minimize Contact', exact: true }).click();
  await expect(contact).toBeHidden();
  await page.getByRole('button', { name: 'Dock: Contact', exact: true }).click();
  await expect(contact.getByLabel('Your name')).toHaveValue('Draft survives');
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog', { name: 'Search workspace' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Search workspace' })).toHaveCount(0);
  await expect(contact).toBeVisible();
  await expect(contact.getByLabel('Your name')).toHaveValue('Draft survives');
});

test('palette supports arrows, Enter, Tab confinement, and case links', async ({ page }) => {
  await page.goto('/os');
  await page.getByRole('button', { name: 'Open search', exact: true }).click();
  const search = page.getByRole('combobox', { name: 'Search apps and projects' });
  await search.fill('OneBrain');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  const detail = page.getByRole('dialog', { name: 'OneBrain — case study', exact: true });
  await expect(detail).toBeVisible();
  await expect(detail.getByRole('link', { name: 'Shareable case page' })).toHaveAttribute(
    'href',
    '/work/onebrain',
  );
  await page.keyboard.press('Control+k');
  const palette = page.getByRole('dialog', { name: 'Search workspace' });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  expect(await palette.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(detail).toBeVisible();
});

test('saved notes survive initialization; resetting preferences keeps notes', async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem('personal-os-settings-v2'))
      localStorage.setItem(
        'personal-os-settings-v2',
        JSON.stringify({
          accentId: 'ocean',
          wallpaper: 'night',
          sounds: false,
          haptics: false,
          motion: 'calm',
        }),
      );
    if (!localStorage.getItem('personal-os-whiteboard-v2'))
      localStorage.setItem(
        'personal-os-whiteboard-v2',
        JSON.stringify([{ id: 'saved', text: 'Persisted note', color: '#fef08a' }]),
      );
  });
  await page.goto('/os');
  await page.locator('summary').click();
  await page.getByRole('button', { name: 'Open Whiteboard: Local sticky notes' }).click();
  const board = page.getByRole('dialog', { name: 'Whiteboard', exact: true });
  await expect(board.getByText('Persisted note', { exact: true })).toBeVisible();
  await board.getByRole('button', { name: 'Minimize Whiteboard', exact: true }).click();
  await page.getByRole('button', { name: 'Dock: Settings', exact: true }).click();
  const settings = page.getByRole('dialog', { name: 'Settings', exact: true });
  await expect(settings.getByRole('button', { name: 'Ocean', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await settings.getByRole('button', { name: 'Reset preferences' }).click();
  await expect(settings.getByRole('status')).toContainText('whiteboard notes were kept');
  await settings.getByRole('button', { name: 'Close Settings', exact: true }).click();
  await page.getByRole('button', { name: 'Dock: Whiteboard', exact: true }).click();
  await expect(board.getByText('Persisted note', { exact: true })).toBeVisible();
  await page.reload();
  await page.locator('summary').click();
  await page.getByRole('button', { name: 'Open Whiteboard: Local sticky notes' }).click();
  await expect(
    page.getByRole('dialog', { name: 'Whiteboard' }).getByText('Persisted note', { exact: true }),
  ).toBeVisible();
});

test('phone sheets are focused, scrollable, and keep drafts when minimized', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/os');
  await page.getByRole('button', { name: 'Open Contact: Hiring & project inquiries' }).click();
  const dialog = page.getByRole('dialog', { name: 'Contact', exact: true });
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await dialog.getByLabel('Your name').fill('Phone draft');
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  const bounds = await dialog.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  await dialog.getByRole('button', { name: 'Minimize Contact', exact: true }).click();
  await page.getByRole('button', { name: 'Dock: Contact', exact: true }).click();
  await expect(dialog.getByLabel('Your name')).toHaveValue('Phone draft');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('bad or blocked storage does not crash the desktop', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError');
      },
    });
  });
  await page.goto('/os');
  await page.getByRole('button', { name: 'Dock: Settings', exact: true }).click();
  await expect(
    page.getByText('Storage unavailable. Changes apply to this session only.'),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Close Settings', exact: true }).click();
  await page.locator('summary').click();
  await page.getByRole('button', { name: 'Open Whiteboard: Local sticky notes' }).click();
  await expect(
    page.getByText('Browser storage is unavailable. Notes will last only for this session.'),
  ).toBeVisible();
});

test('reduced motion is honored and no hydration warnings occur', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && /hydration|unique.*key|mismatch/i.test(message.text()))
      errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/os');
  await expect(page.locator('.personal-os')).toHaveClass(/motion-calm/);
  await page.getByRole('button', { name: 'Open Work: Projects & case studies' }).click();
  await expect(page.getByRole('dialog', { name: 'Work', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('the HTML resume also prints to a single A4 page', async ({ page }) => {
  await page.goto('/resume');
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  expect((pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) ?? []).length).toBe(1);
});

test('clipboard failure is reported rather than claiming a copy succeeded', async ({ page }) => {
  await page.goto('/contact');
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new DOMException('Blocked', 'NotAllowedError');
        },
      },
    }),
  );
  await page.getByRole('button', { name: 'Copy email', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Clipboard unavailable');
});

test('desktop and day wallpaper remain accessible', async ({ page }) => {
  await page.goto('/os');
  await page.getByRole('button', { name: 'Dock: Settings', exact: true }).click();
  await page
    .getByRole('dialog', { name: 'Settings', exact: true })
    .getByRole('button', { name: /^day$/i })
    .click();
  await page.getByRole('button', { name: 'Close Settings', exact: true }).click();
  await expect(page.locator('.wp-day')).toHaveCount(1);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('windows stay in bounds after resize and phone titlebar swipes minimize', async ({ page }) => {
  await page.goto('/os');
  await page.getByRole('button', { name: 'Open Work: Projects & case studies' }).click();
  const work = page.getByRole('dialog', { name: 'Work', exact: true });
  await expect(work).toBeVisible();
  await page.setViewportSize({ width: 800, height: 500 });
  await expect
    .poll(async () => {
      const box = await work.boundingBox();
      return !!box && box.x >= 0 && box.x + box.width <= 800 && box.y + box.height <= 500;
    })
    .toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(work).toHaveAttribute('aria-modal', 'true');
  const bar = await work.getByRole('heading', { name: 'Work', exact: true }).boundingBox();
  await page.mouse.move(bar!.x + bar!.width / 2, bar!.y + bar!.height / 2);
  await page.mouse.down();
  await page.mouse.move(bar!.x + bar!.width / 2, bar!.y + 160, { steps: 10 });
  await page.mouse.up();
  await expect(work).toBeHidden();
  await page.getByRole('button', { name: 'Dock: Work', exact: true }).click();
  await expect(work).toBeVisible();
});
