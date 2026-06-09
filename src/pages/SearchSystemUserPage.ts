import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import locator from '../utils/config/locators.json';

export class SearchSystemUserPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async openAdmin() {
        await this.click(locator.search.adminTab);
    }

    async enterUsername(username: string) {
        await this.enterText(locator.search.usernameSearch, username);
    }

    async clickSearch() {
        await this.click(locator.search.searchBtn);
    }

    async expectRecordFound() {
        await this.verifyElement(locator.search.recordFound);
    }
}
