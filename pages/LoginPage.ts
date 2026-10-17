export class LoginPage {
    constructor(page) {
        this.page = page;

        this.signInButton = page.locator('button.header_signin');
        this.emailInput = page.locator('#signinEmail');
        this.passwordInput = page.locator('#signinPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async open() {
        await this.page.goto('/');
    }

    async login(email, password) {
        await this.signInButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.passwordInput.blur();
        await this.loginButton.click();
}
}