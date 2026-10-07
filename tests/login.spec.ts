import { test, expect } from '@playwright/test';
import { BASE_URL, username, password } from '../utils/envConfig';
import { LoginPage } from '../pages/LoginPage';

//Parameterized/ Data Driven Tests
for (const user of ['standard_user', 'visual_user', 'problem_user']) {
  test(`Login with user ${user}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.loginToApplication(user, password);
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
}

test('Login with Valid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(BASE_URL);
  await loginPage.loginToApplication(username, password);
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});