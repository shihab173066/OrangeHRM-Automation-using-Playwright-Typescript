// pages/BasePage.ts
import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Generic navigation method shared across all pages
    async navigateTo(url: string) {
        await this.page.goto(url);
    }
}