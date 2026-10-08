import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('Registration form', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);

    await page.goto('/');
    await registrationPage.openRegistrationForm();
  });

  test('Successful registration with valid data', async ({ page }) => {
    const email = `aqa-${Date.now()}@test.com`;

    await registrationPage.fillRegistrationForm(
      'Anton',
      'Veselkov',
      email,
      'Test1234',
      'Test1234',
    );

    await expect(registrationPage.registerButton).toBeEnabled();

    await registrationPage.clickRegister();

    await expect(page).toHaveURL(/\/panel\/garage$/);
    await expect(
      page.getByRole('heading', { name: 'Garage' }),
    ).toBeVisible();
  });

  test('Name is empty', async () => {
    await registrationPage.blurField(registrationPage.nameInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.nameInput),
    ).toHaveText('Name required');

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Name contains invalid characters', async () => {
    await registrationPage.nameInput.fill('@#$%');
    await registrationPage.blurField(registrationPage.nameInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.nameInput),
    ).toHaveText('Name is invalid');

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Name has less than 2 characters', async () => {
    await registrationPage.nameInput.fill('A');
    await registrationPage.blurField(registrationPage.nameInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.nameInput),
    ).toHaveText('Name has to be from 2 to 20 characters long');

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Name has more than 20 characters', async () => {
    await registrationPage.nameInput.fill('A'.repeat(21));
    await registrationPage.blurField(registrationPage.nameInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.nameInput),
    ).toHaveText('Name has to be from 2 to 20 characters long');

    await expect(registrationPage.nameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Last name is empty', async () => {
    await registrationPage.blurField(registrationPage.lastNameInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.lastNameInput),
    ).toHaveText('Last name required');

    await expect(registrationPage.lastNameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Last name contains invalid characters', async () => {
    await registrationPage.lastNameInput.fill('@#$%');
    await registrationPage.blurField(registrationPage.lastNameInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.lastNameInput),
    ).toHaveText('Last name is invalid');

    await expect(registrationPage.lastNameInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Email is empty', async () => {
    await registrationPage.blurField(registrationPage.emailInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.emailInput),
    ).toHaveText('Email required');

    await expect(registrationPage.emailInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Email has invalid format', async () => {
    await registrationPage.emailInput.fill('invalid-email');
    await registrationPage.blurField(registrationPage.emailInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.emailInput),
    ).toHaveText('Email is incorrect');

    await expect(registrationPage.emailInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Password is empty', async () => {
    await registrationPage.blurField(registrationPage.passwordInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.passwordInput),
    ).toHaveText('Password required');

    await expect(registrationPage.passwordInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Password does not satisfy complexity requirements', async () => {
    await registrationPage.passwordInput.fill('password');
    await registrationPage.blurField(registrationPage.passwordInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.passwordInput),
    ).toHaveText(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    );

    await expect(registrationPage.passwordInput).toHaveClass(/is-invalid/);
    await expect(registrationPage.registerButton).toBeDisabled();
  });

  test('Passwords do not match', async () => {
    await registrationPage.fillRegistrationForm(
      'Anton',
      'Veselkov',
      `aqa-${Date.now()}@test.com`,
      'Test1234',
      'Test5678',
    );

    await registrationPage.blurField(registrationPage.repeatPasswordInput);

    await expect(
      registrationPage.getErrorMessage(registrationPage.repeatPasswordInput),
    ).toHaveText('Passwords do not match');

    await expect(
      registrationPage.repeatPasswordInput,
    ).toHaveClass(/is-invalid/);

    await expect(registrationPage.registerButton).toBeDisabled();
  });
});