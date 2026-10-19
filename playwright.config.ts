import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.QAUTO_USERNAME!,
      password: process.env.QAUTO_PASSWORD!,
    },
    
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      testIgnore: '**/api/**',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      testIgnore: '**/api/**',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      testIgnore: '**/api/**',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'api-auth',
      testMatch: '**/api/auth.setup.ts',
      use: {},
    },
    
    {
      name: 'api',
      testMatch: '**/api/cars-api.spec.ts',
      dependencies: ['api-auth'],
      use: {},
    },
  ],
});
