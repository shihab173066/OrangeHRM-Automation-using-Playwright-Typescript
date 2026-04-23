// pages/LoginPage.ts
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { loginLocators } from './locators/loginLocators';
import { EnvUtils } from '../utils/EnvUtils';

export class LoginPage extends BasePage {
    
    async navigate() {
        const baseUrl = EnvUtils.getBaseUrl();
        await this.navigateTo(baseUrl);
    }

    async login() {
        const { username, password } = EnvUtils.getCredentials();

        // 1. Wait for the username field to be fully ready and visible
        const userInput = this.page.locator(loginLocators.usernameInput);
        await userInput.waitFor({ state: 'visible' });
        
        // 2. Fill the credentials
        await userInput.fill(username);
        await this.page.locator(loginLocators.passwordInput).fill(password);
        
        // 3. Click the login button
        await this.page.locator(loginLocators.loginButton).click();
        
        // 4. Wait for the network to stabilize after login so the URL has time to change
        await this.page.waitForLoadState('networkidle');
    }

    async verifySuccessfulLogin() {
        // We use a regex here so it dynamically passes regardless of the base domain
        await expect(this.page).toHaveURL(/.*dashboard\/index/);
        await expect(this.page.locator(loginLocators.dashboardHeader)).toBeVisible();
        await expect(this.page.locator(loginLocators.userDropdown)).toBeVisible();
    }
}