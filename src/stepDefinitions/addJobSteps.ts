import { When, Then } from '@cucumber/cucumber'
import { page } from '../hooks/hooks';
import { BasePage } from '../pages/BasePage';
import locator from '../locators/locators.json';

let base: BasePage;

When('user opens the Admin section', async function () {
    base = new BasePage(page);
    await base.openAdminPage(locator.admin.adminTab);
});

When('user expands the Job menu', async function () {
    await base.click(locator.admin.jobMenu);
});

When('user clicks on Job Titles', async function () {
    await base.click(locator.admin.jobTitles);
});

When('user clicks on Add Job button', async function () {
    await base.click(locator.admin.addButton);
});

When('user enters {string} in the job title field', async function (jobTitle: string) {
    const uniqueJobTitle = `${jobTitle}-${Date.now()}`;
    await base.enterText(locator.admin.jobTitleInput, uniqueJobTitle);
});

When('user enters {string} in the job description field', async function (jobDescription: string) {
    await base.enterText(locator.admin.jobDescriptionInput, jobDescription);
});

When('user clicks on Save Job button', async function () {
    await base.click(locator.admin.saveButton);
});

Then('user sees job creation confirmation', async function () {
    await base.verifyElementContainsText(locator.admin.successMessage, 'Successfully Saved');
});
