// tests/searchEmployee.spec.ts
import { test } from '../fixtures/testBase';
import employeeData from '../test-data/employees.json';

test.describe('PIM Module - Employee Search', () => {

    test.setTimeout(60000); // Give the test 60 seconds since it's doing two big actions

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login();
        await loginPage.verifySuccessfulLogin();
    });

    // LOOP OVER THE JSON DATA: Playwright will run this test block for every item in the JSON file
    for (const data of employeeData) {
        
        // Dynamically name the test in the report so you know which data set ran
        test(`TC_E2E_003: Search & Verify Employee - ${data.scenario}`, async ({ dashboardPage, pimPage }) => {

            console.log(`---> Testing with Data: ${data.firstName} ${data.lastName} (ID: ${data.dynamicEmpId})`);

            // --- PRE-CONDITION ---
            await dashboardPage.navigateToPIM();
            await pimPage.goToAddEmployee();
            // Pass the data directly from the JSON iteration
            await pimPage.createEmployee(data.firstName, data.lastName, data.dynamicEmpId);
            await pimPage.verifyEmployeeCreatedSuccessfully();

            // --- TEST STEPS ---
            await pimPage.goToEmployeeList();
            await pimPage.searchEmployeeById(data.dynamicEmpId);

            // --- EXPECTED RESULT ---
            await pimPage.verifySearchResults(data.firstName, data.lastName, data.dynamicEmpId);
        });
    }

});