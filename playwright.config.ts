import { defineConfig, devices } from '@playwright/test';

const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ??
  'http://127.0.0.1:5173';

const isRemote = Boolean(
  process.env.PLAYWRIGHT_BASE_URL,
);

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'mobile',

      use: {
        ...devices['Pixel 5'],
      },
    },
  ],

  ...(isRemote
    ? {}
    : {
        webServer: {
          command:
            'npm run dev -- --host 127.0.0.1',

          url: 'http://127.0.0.1:5173',

          reuseExistingServer: true,
        },
      }),
});