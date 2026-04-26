// tests/createEmployee.spec.ts
import { test } from '../fixtures/testBase';

test.describe('PIM Module - Employee Management', () => {

    test.setTimeout(60000);
    // PRE-CONDITION: User must be logged in before creating an employee
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login();
        await loginPage.verifySuccessfulLogin();
    });

    test('TC_E2E_002: Create New Employee', async ({ dashboardPage, pimPage }) => {
        
        // --- TEST DATA ---
        const firstName = 'Jane';
        const lastName = 'Doe';
        
        // SUPER DYNAMIC DATA: Generate a random ID (e.g., EMP-4921) 
        // This ensures the test never fails due to an "Employee ID already exists" error.
        const dynamicEmpId = `${Math.floor(Math.random() * 10000)}`;

        // --- TEST STEPS ---
        // Step 1: Click on PIM in the side menu
        await dashboardPage.navigateToPIM();

        // Step 2: Click on Add Employee
        await pimPage.goToAddEmployee();

        // Step 3, 4, 5: Enter details, capture/inject ID, and save
        await pimPage.createEmployee(firstName, lastName, dynamicEmpId);
        
        console.log(`---> Successfully submitted creation for Employee ID: ${dynamicEmpId}`);

        // --- EXPECTED RESULT ---
        await pimPage.verifyEmployeeCreatedSuccessfully();
    });

});