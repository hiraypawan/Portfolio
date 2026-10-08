import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: process.env.CI ? 2 : 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 30000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
      args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ? ['--disable-gpu'] : []),
      ],
    },
  },
  webServer: {
    command: 'npm run start -- --port 3000',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
