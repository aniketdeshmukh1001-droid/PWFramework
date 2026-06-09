import { Given, When, Then } from '@cucumber/cucumber'
import { page } from '../hooks/hooks';
import { BasePage } from '../pages/BasePage';
import locator from '../utils/config/locators.json';
import { URLS } from '../utils/config/env';

let base:BasePage;
       
        Given('user navigates to url', async function () 
        {
           base = new BasePage(page);
           await base.navigate(URLS.url);
        });
    
        When('user enters {string} in the username field',async function (username:string) 
        {
           await base.enterText(locator.login.username,username);
        });

        When('user enters {string} in the password field',async function (password:string) 
        {
           await base.enterText(locator.login.password,password);
        });
       
        When('user clicks on Login button',async function () 
        {       
           await base.click(locator.login.loginBtn);
        });
       
        Then('user should land on the Dashboard page',async function () 
        {
           await base.verifyElement(locator.login.dashboard);
        });
        Then('application shows appropriate error message', async function() 
        {
          await page.waitForTimeout(3000); 
          await base.verifyElement(locator.login.loginError); 
        })
