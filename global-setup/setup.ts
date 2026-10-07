import { chromium } from '@playwright/test';

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        httpCredentials: {
            username: 'standard_user',
            password: 'secret_sauce',
        }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    console.log('Logged in successfully');
    await context.storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;