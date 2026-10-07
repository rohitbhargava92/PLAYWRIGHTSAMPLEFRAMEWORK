import {test,expect} from '../fixtures/auth.fixture'

test('Login with Valid Credentials', async({loggedInUser})=>{
    await expect(loggedInUser).toHaveURL('https://www.saucedemo.com/inventory.html');
});