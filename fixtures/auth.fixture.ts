import {test as base,expect, Page} from '@playwright/test';

type MyFixtures = {
    loggedInUser: Page;
  };

  export const test = base.extend<MyFixtures>({
    loggedInUser: async ({ page }, use) => {
      // Perform login steps here
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'standard_user');
      await page.fill('#password', 'secret_sauce');
      await page.click('#login-button');
      await use(page);
    }
  });

  export { expect };