import { test, expect } from '@playwright/test';
import { BASE_URL, username, password } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import {userDataCheckout} from '../testData/userDetails'

test.describe("Checkout Page Validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto(BASE_URL);
        await loginPage.loginToApplication(username, password);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        await cartPage.clickCheckoutButton();
    })

     test("Validate Checkout Page Elements on UI and URL",async({page})=>
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
        const elements= await checkoutPage.getCheckoutElements();
        await expect(elements.cancelButton).toBeVisible();
        await expect(elements.continueButton).toBeVisible();
        await expect(elements.pageInfo).toBeVisible();
    })

    test("Validate Cancel Button Functionality",async({page})=>
    {
        await checkoutPage.clickCancelButton();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
    })

    test("Validate Continue Button Functionality",async({page})=>
    {
        await checkoutPage.fillCheckoutDetails(userDataCheckout.firstName,userDataCheckout.lastName,userDataCheckout.postalCode);
        await checkoutPage.clickContinueButton();
    })

    test("Validate Error Message in Input Fields",async({page})=>{
        await checkoutPage.clickContinueButton();
        const errorMessage= await checkoutPage.getErrorMessage();
        expect(errorMessage?.trim()).toBe("Error: First Name is required");
    })
})