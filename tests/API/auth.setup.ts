import { test, expect, request } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const authFile = path.resolve('playwright/.auth/user.json');

test('Login via API and save storage state', async () => {
  const apiContext = await request.newContext({
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.QAUTO_USERNAME!,
      password: process.env.QAUTO_PASSWORD!,
    },
  });

  try {
    const response = await apiContext.post('/api/auth/signin', {
      data: {
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD,
      },
    });

    expect(
      response.ok(),
      `Login failed: ${response.status()} ${await response.text()}`
    ).toBeTruthy();

    await fs.mkdir(path.dirname(authFile), { recursive: true });
    await apiContext.storageState({ path: authFile });

    const state = JSON.parse(await fs.readFile(authFile, 'utf-8'));

    expect(
      state.cookies.some(
        (cookie: { name: string }) => cookie.name === 'sid'
      ),
      'Cookie sid should be saved'
    ).toBeTruthy();
  } finally {
    await apiContext.dispose();
  }
});
