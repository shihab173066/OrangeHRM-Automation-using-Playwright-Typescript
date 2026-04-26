// pages/locators/pimLocators.ts

export const pimLocators = {
    // ... your existing locators ...
    addEmployeeTab: 'a:has-text("Add Employee")',
    firstNameInput: 'input[name="firstName"]',
    lastNameInput: 'input[name="lastName"]',
    employeeIdInput: '.oxd-input-group:has-text("Employee Id") input',
    saveButton: 'button[type="submit"]',
    successToast: '.oxd-toast--success',
    personalDetailsHeader: 'h6:has-text("Personal Details")',

    // --- NEW SEARCH & VERIFY LOCATORS ---
    employeeListTab: 'a:has-text("Employee List")',
    
    // Very strict locators targeting the search form specifically
    employeeIdSearchInput: 'div.oxd-input-group:has(label:has-text("Employee Id")) input',
    searchButton: 'button[type="submit"]:has-text("Search")',
    
    // Grid Locators
    searchResultsGrid: '.oxd-table-body',
    searchResultRow: '.oxd-table-card',
    // OrangeHRM uses standard column indexes for its grid
    searchResultIdColumn: 'div[role="cell"]:nth-child(2)',
    searchResultFirstNameColumn: 'div[role="cell"]:nth-child(3)',
    searchResultLastNameColumn: 'div[role="cell"]:nth-child(4)',
};