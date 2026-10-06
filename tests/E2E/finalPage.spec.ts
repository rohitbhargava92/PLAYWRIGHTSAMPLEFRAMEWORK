import { test, expect } from '@playwright/test';
import { BASE_URL, username, password } from '../../utils/envConfig';
import { ProductPage } from '../../pages/ProductPage';
import { LoginPage } from '../../pages/LoginPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import {CheckoutOverviewPage} from '../../pages/CheckoutOverviewPage'
import {userDataCheckout} from '../../testData/userDetails'
import { productsToBeAdded } from '../../testData/products';
import { FinalPage } from '../../pages/FinalPage';

test.describe("E2E Test Validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverviewPage: CheckoutOverviewPage;
    let finalPage: FinalPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage= new CheckoutOverviewPage(page);
        finalPage= new FinalPage(page);
        await page.goto(BASE_URL);
        await loginPage.loginToApplication(username, password);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.addSpecificProductsToCart(productsToBeAdded);
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(userDataCheckout.firstName,userDataCheckout.lastName,userDataCheckout.postalCode);
        await checkoutPage.clickContinueButton();
        await checkoutOverviewPage.clickFinish();
    })



     test("Validate Order Sucessfull",async({page})=>
    {
        const message= await finalPage.getSuccessMessageText();
        expect(message).toBe("Thank you for your order!");
    })



})