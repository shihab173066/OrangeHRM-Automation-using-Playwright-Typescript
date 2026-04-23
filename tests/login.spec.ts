// tests/login.spec.ts
import { test } from '../fixtures/testBase';

test.describe('Authentication Scenarios: Application is accessible.', () => {
    
    // We instantly have access to `loginPage` via the fixture
    test('TC_E2E_001: Login to OrangeHRM', async ({ loginPage }) => {
        
        await loginPage.navigate();
        await loginPage.login();
        await loginPage.verifySuccessfulLogin();
        
    });

});