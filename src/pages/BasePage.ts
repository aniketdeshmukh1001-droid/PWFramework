import {Page, expect} from '@playwright/test';

export class BasePage
{
    page:Page;

    constructor(page:Page)
    {
        this.page = page;
    }

    async navigate(url:string)
    {
        await this.page.goto(url);
    }

    async enterText(locator:string, value:string)
    {
        await this.page.locator(locator).fill(value);
    }

    async click(locator:string)
    {
        await this.page.locator(locator).click();
    }

    async openAdminPage(locator:string)
    {
        await this.click(locator);
    }

    async verifyElement(locator:string)
    {
        await expect(this.page.locator(locator)).toBeVisible();
    }

    async verifyElementContainsText(locator:string, expectedText:string)
    {
        await expect(this.page.locator(locator)).toContainText(expectedText);
    }







}