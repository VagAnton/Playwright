import { test, expect } from '@playwright/test';

test.describe('Header buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Logo', async ({ page }) => {
    await expect(
      page.locator('a.header_logo')
    ).toBeVisible();
  });

  test('Home link', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: 'Home' })
    ).toBeVisible();
  });

  test('About button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'About' })
    ).toBeVisible();
  });

  test('Contacts button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Contacts' })
    ).toBeVisible();
  });

  test('Guest log in button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Guest log in' })
    ).toBeVisible();
  });

  test('Sign In button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Sign In' })
    ).toBeVisible();
  });
});