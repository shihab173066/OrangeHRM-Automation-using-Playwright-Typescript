// pages/PimPage.ts
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { pimLocators } from './locators/pimLocators';
import { AppRoutes } from '../utils/appRoutes';

export class PimPage extends BasePage {
    
    async goToAddEmployee() {
        const addBtn = this.page.locator(pimLocators.addEmployeeTab);
        await addBtn.waitFor({ state: 'visible' });
        await addBtn.click();
    }

    async createEmployee(firstName: string, lastName: string, empId: string) {

        // await this.page.waitForTimeout(1000);
        
        // 1. Fill Names
        await this.page.locator(pimLocators.firstNameInput).fill(firstName);
        await this.page.locator(pimLocators.lastNameInput).fill(lastName);

        // 2. Clear and fill the ID field using standard fill()
        const idLocator = this.page.locator(pimLocators.employeeIdInput);
        await idLocator.clear();
        await idLocator.fill(empId);

        // 3. Firefox/WebKit Fix: Click a static text element (the header) 
        // to definitively force the browser to drop focus from the ID box.
        await this.page.locator('h6').first().click();

        // 4. Wait for frontend validation to complete
        await this.page.waitForTimeout(1000);


        // 5. Click Save
        const saveBtn = this.page.locator(pimLocators.saveButton);
        await saveBtn.click();
    }

    async verifyEmployeeCreatedSuccessfully() {
        // OVERRIDE THE TIMEOUTS:
        // The OrangeHRM demo database can be very slow. We tell Playwright to wait up 
        // to 15 seconds for the success messages and URL redirect instead of the default 5.
        
        const toast = this.page.locator(pimLocators.successToast);
        await expect(toast).toBeVisible({ timeout: 15000 });

        // Ensure this matches exactly what you imported from your AppRoutes file
        // Or leave it as the regex: /.*pim\/viewPersonalDetails.*/
        await expect(this.page).toHaveURL(AppRoutes.PIM, { timeout: 15000 });
        
        await expect(this.page.locator(pimLocators.personalDetailsHeader)).toBeVisible({ timeout: 70000 });
    }

    async goToEmployeeList() {
        const listTab = this.page.locator(pimLocators.employeeListTab);
        await listTab.waitFor({ state: 'visible' });
        await listTab.click();
    }

    async searchEmployeeById(empId: string) {
        // Find the search box, fill it, and wait for OrangeHRM's UI to register it
        const idSearchBox = this.page.locator(pimLocators.employeeIdSearchInput).first();
        await idSearchBox.waitFor({ state: 'visible' });
        await idSearchBox.fill(empId);
        await this.page.keyboard.press('Tab'); // Force Vue.js hydration

        const searchBtn = this.page.locator(pimLocators.searchButton);
        await searchBtn.click();

        // The demo site takes a second to filter the grid
        await this.page.waitForTimeout(1000); 
    }

    async verifySearchResults(firstName: string, lastName: string, empId: string) {
        // 1. Wait for the grid to reload after clicking search
        const grid = this.page.locator(pimLocators.searchResultsGrid);
        await grid.waitFor({ state: 'visible', timeout: 15000 });

        // 2. Expected Result: Exactly one record matching
        const rows = this.page.locator(pimLocators.searchResultRow);
        await expect(rows).toHaveCount(1, { timeout: 10000 });

        // 3. Expected Result: Verify the specific data in the columns
        const firstRow = rows.first();
        await expect(firstRow.locator(pimLocators.searchResultIdColumn)).toContainText(empId);
        await expect(firstRow.locator(pimLocators.searchResultFirstNameColumn)).toContainText(firstName);
        await expect(firstRow.locator(pimLocators.searchResultLastNameColumn)).toContainText(lastName);
    }
}