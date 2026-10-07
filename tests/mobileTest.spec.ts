import {test,expect,devices} from '@playwright/test'

test.use({
    ...devices['iPhone 13'],
    viewport: { width: 390, height: 844 },
});

test('Login with Valid Credentials on Mobile', async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});