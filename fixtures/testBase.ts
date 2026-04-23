// fixtures/testBase.ts
import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Declare the types of your fixtures
type MyFixtures = {
    loginPage: LoginPage;
};

// Extend base test to include your custom page objects
export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        // Instantiate once and inject into tests
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

export { expect } from '@playwright/test';