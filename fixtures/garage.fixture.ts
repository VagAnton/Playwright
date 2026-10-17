/// <reference types="node" />

import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { GaragePage } from '../pages/GaragePage';

type GarageFixtures = {
    userGaragePage: GaragePage;
};

export const test = base.extend<GarageFixtures>({
    userGaragePage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.open();

        await loginPage.login(
            process.env.TEST_EMAIL,
            process.env.TEST_PASSWORD
        );

        await expect(
            page.locator('#userNavDropdown')
        ).toBeVisible();

        const garagePage = new GaragePage(page);

        await garagePage.open();

        await expect(
            garagePage.addCarButton
        ).toBeVisible();

        await use(garagePage);
    },
});

export { expect };