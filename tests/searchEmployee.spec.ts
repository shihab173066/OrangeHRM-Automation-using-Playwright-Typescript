// tests/searchEmployee.spec.ts
import { test } from '../fixtures/testBase';

test.describe('PIM Module - Employee Search', () => {

    test.setTimeout(60000); // Give the test 60 seconds since it's doing two big actions

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login();
        await loginPage.verifySuccessfulLogin();
    });

    test('TC_E2E_003: Search & Verify Employee', async ({ dashboardPage, pimPage }) => {
        
        // --- DYNAMIC TEST DATA SETUP ---
        const firstName = 'Automation';
        const lastName = 'SearchUser';
        const dynamicEmpId = `SRCH-${Math.floor(Math.random() * 9000) + 1000}`;

        // --- PRE-CONDITION: Create the employee so we have guaranteed data to search ---
        console.log(`---> Setting up data: Creating employee ${dynamicEmpId}`);
        await dashboardPage.navigateToPIM();
        await pimPage.goToAddEmployee();
        await pimPage.createEmployee(firstName, lastName, dynamicEmpId);
        await pimPage.verifyEmployeeCreatedSuccessfully();

        // --- TEST STEPS: Search Flow ---
        console.log('---> Executing Search test steps...');
        
        // Step 1: Navigate to PIM > Employee List
        await pimPage.goToEmployeeList();

        // Step 2 & 3: Enter Employee ID and Click Search
        // Note: Searching by ID is the most foolproof method for a 1:1 exact match assertion
        await pimPage.searchEmployeeById(dynamicEmpId);

        // --- EXPECTED RESULT ---
        console.log('---> Verifying search results grid...');
        await pimPage.verifySearchResults(firstName, lastName, dynamicEmpId);
    });

});