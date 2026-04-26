// fixtures/testBase.ts
import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';

type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    pimPage: PimPage;
};

export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    // Add the new pages to the fixture
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    pimPage: async ({ page }, use) => {
        await use(new PimPage(page));
    },
});

export { expect } from '@playwright/test';