import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import locator from '../utils/config/locators.json';

export class AddJobPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async openAdminSection() {
        await this.click(locator.admin.adminTab);
    }

    async expandJobMenu() {
        await this.click(locator.admin.jobMenu);
    }

    async openJobTitles() {
        await this.click(locator.admin.jobTitles);
    }

    async clickAddJob() {
        await this.click(locator.admin.addButton);
    }

    async enterJobTitle(jobTitle: string) {
        const uniqueJobTitle = `${jobTitle}-${Date.now()}`;
        await this.enterText(locator.admin.jobTitleInput, uniqueJobTitle);
    }

    async enterJobDescription(description: string) {
        await this.enterText(locator.admin.jobDescriptionInput, description);
    }

    async clickSave() {
        await this.click(locator.admin.saveButton);
    }

    async expectSuccessMessage() {
        await this.verifyElementContainsText(locator.admin.successMessage, 'Successfully Saved');
    }
}
