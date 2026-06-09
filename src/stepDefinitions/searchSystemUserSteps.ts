import { When, Then } from '@cucumber/cucumber'
import { page } from '../hooks/hooks';
import { SearchSystemUserPage } from '../pages/SearchSystemUserPage';

let searchPage: SearchSystemUserPage;

When('user opens the Admin page', async function () 
{
   searchPage = new SearchSystemUserPage(page);
   await searchPage.openAdmin();

});
  
When('user enters username as {string}', async function (username: string) 
{
   await searchPage.enterUsername(username);
});

When('user clicks on search button', async function () 
{
   await searchPage.clickSearch();
});

Then('application shows 1 record found', async function () 
{
   await searchPage.expectRecordFound();
});