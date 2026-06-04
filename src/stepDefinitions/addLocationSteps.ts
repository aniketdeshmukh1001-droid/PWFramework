import { When, Then, After } from '@cucumber/cucumber';
import { page } from '../hooks/hooks';
import { BasePage } from '../pages/BasePage';
import locator from '../locators/locators.json';

let base: BasePage;
let currentLocationName: string;

function formatLocator(template: string, values: { [key: string]: string }): string {
    return Object.entries(values).reduce((locatorString, [key, value]) => {
        return locatorString.replace(`{${key}}`, value);
    }, template);
}

When('user navigates to Locations page', async function () {
    base = new BasePage(page);
    await base.openAdminPage(locator.admin.adminTab);
    await base.click(locator.locations.organizationMenu);
    await page.waitForTimeout(500);
    await base.click(locator.locations.locationsLink);
});

When('user opens Add Location form', async function () {
    await base.click(locator.admin.addButton);
});

When('user creates a new location with city {string}, state {string}, country {string}, zipCode {string}, phone {string}', async function (city: string, state: string, country: string, zipCode: string, phone: string) {
    currentLocationName = `Location-${city}-${Date.now()}`;
    await base.enterText(locator.locations.locationNameInput, currentLocationName);
    await base.enterText(locator.locations.cityInput, city);
    await base.enterText(locator.locations.stateProvinceInput, state);
    await base.enterText(locator.locations.zipCodeInput, zipCode);
    await base.click(locator.locations.countrySelect);
    const countryOption = formatLocator(locator.locations.countryOption, { country });
    await page.waitForSelector(countryOption, { timeout: 5000 });
    await base.click(countryOption);
    await base.enterText(locator.locations.phoneInput, phone);
    await base.enterText(locator.locations.faxInput, `+91${phone}`);
    await base.enterText(locator.locations.addressTextarea, `${city} office address`);
    await base.enterText(locator.locations.notesTextarea, `Automated location created for ${city}`);
});

When('user clicks on Save Location button', async function () {
    await base.click(locator.admin.saveButton);
});

Then('user should see location saved successfully', async function () {
    await base.verifyElementContainsText(locator.admin.successMessage, 'Successfully Saved');
});

Then('newly created location appears in the Locations list', async function () {
    await page.waitForSelector(locator.locations.searchName, { timeout: 10000 });
    await base.enterText(locator.locations.searchName, currentLocationName);
    await base.click(locator.search.searchBtn);
    const resultLocator = formatLocator(locator.locations.locationRowByName, { locationName: currentLocationName });
    await page.waitForSelector(resultLocator, { timeout: 10000 });
    await base.verifyElement(resultLocator);
});

Then('application shows required field validation', async function () {
    await base.verifyElement(locator.locations.requiredFieldError);
});

After(async function () {
    if (!currentLocationName) {
        return;
    }

    try {
        await base.openAdminPage(locator.admin.adminTab);
        await base.click(locator.locations.organizationMenu);
        await page.waitForTimeout(500);
        await base.click(locator.locations.locationsLink);
        await page.waitForSelector(locator.locations.searchName, { timeout: 10000 });
        await base.enterText(locator.locations.searchName, currentLocationName);
        await base.click(locator.search.searchBtn);
        const deleteButtonLocator = formatLocator(locator.locations.locationDeleteButton, { locationName: currentLocationName });
        await page.waitForSelector(deleteButtonLocator, { timeout: 10000 });
        await base.click(deleteButtonLocator);
        await page.waitForSelector(locator.locations.deleteConfirmButton, { timeout: 10000 });
        await base.click(locator.locations.deleteConfirmButton);
        await page.waitForSelector(locator.admin.successMessage, { timeout: 10000 });
    } catch (error) {
        // cleanup best-effort; ignore failures to avoid masking test result
    } finally {
        currentLocationName = '';
    }
});
