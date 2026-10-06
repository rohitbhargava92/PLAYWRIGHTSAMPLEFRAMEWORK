import { test, expect } from '@playwright/test';
import { BASE_URL, username, password } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import {CheckoutOverviewPage} from '../pages/CheckoutOverviewPage'
import {userDataCheckout} from '../testData/userDetails'
import { productsToBeAdded } from '../testData/products';
import { FinalPage } from '../pages/finalPage';

test.describe("Checkout Overview Page Validation", () => {
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

     test("Validate Final Page Elements on UI and URL",async({page})=>
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
        const elements= await finalPage.getFinalPageElements();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.backHomeButton).toBeVisible();
        await expect(elements.successMsg).toBeVisible();
    })

     test("Validate Success Message",async({page})=>
    {
        const message= await finalPage.getSuccessMessageText();
        expect(message).toBe("Thank you for your order!");
    })

     test("Validate Back Home Button",async({page})=>
    {
        await finalPage.clickBackHomeButton();
        expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })



})