// pages/DashboardPage.ts
import { BasePage } from './BasePage';
import { dashboardLocators } from './locators/dashboardLocators';

export class DashboardPage extends BasePage {
    
    async navigateToPIM() {
        const pimMenu = this.page.locator(dashboardLocators.pimMenuOption);
        await pimMenu.waitFor({ state: 'visible' });
        await pimMenu.click();
    }
    
}