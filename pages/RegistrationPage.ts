import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  readonly signUpButton: Locator;
  readonly registerButton: Locator;

  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.registerButton = page.getByRole('button', { name: 'Register' });

    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
  }

  async openRegistrationForm() {
    await this.signUpButton.click();
  }

  async fillRegistrationForm(
    name: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string,
  ) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async blurField(field: Locator) {
    await field.focus();
    await field.blur();
  }

  getErrorMessage(field: Locator) {
    return field.locator('+ .invalid-feedback p');
  }
}