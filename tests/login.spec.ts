import {test,expect} from '@playwright/test';
import {BASE_URL, username,password} from '../utils/envConfig';
import {LoginPage} from '../pages/LoginPage';


test('Login with Valid Credentials', async({page})=>{
const loginPage= new LoginPage(page);
await page.goto(BASE_URL);
await loginPage.loginToApplication(username,password);
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
})