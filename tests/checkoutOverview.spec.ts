import { test, expect } from '@playwright/test';
import { BASE_URL, username, password } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import {CheckoutOverviewPage} from '../pages/CheckoutOverviewPage'
import {userDataCheckout} from '../testData/userDetails'
import { productsToBeAdded } from '../testData/products';

test.describe("Checkout Overview Page Validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverviewPage: CheckoutOverviewPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage= new CheckoutOverviewPage(page);
        await page.goto(BASE_URL);
        await loginPage.loginToApplication(username, password);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.addSpecificProductsToCart(productsToBeAdded);
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(userDataCheckout.firstName,userDataCheckout.lastName,userDataCheckout.postalCode);
        await checkoutPage.clickContinueButton();
    })

     test("Validate CheckoutOverview Page Elements on UI and URL",async({page})=>
    {
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        const elements= await checkoutOverviewPage.getCheckoutOverviewElements();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.finishButton).toBeVisible();
        await expect(elements.cancelButton).toBeVisible();
    })

     test("Validate Cancel Button Functionality",async({page})=>
    {
        await checkoutOverviewPage.clickCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })

      test("Validate Item Total Calculation",async({page})=>
    {
        const overviewProducts= await checkoutOverviewPage.getCheckoutOverviewProducts();
        const calculatedTotal= overviewProducts.reduce((sum,{price})=>sum+parseFloat(price.replace("$","")),0);
        const uiItemTotal= await checkoutOverviewPage.getItemTotal();
        expect(calculatedTotal).toBe(uiItemTotal);
    })

      test("Validate Final Total(Item Total+Tax) Calculation",async({page})=>
    {
        const itemTotal= await checkoutOverviewPage.getItemTotal();
        const itemTax= await checkoutOverviewPage.getItemTax();
        const actualTotal= await checkoutOverviewPage.getTotal();
        const expectedFinalTotal= parseFloat((itemTotal+itemTax).toFixed(2));
        expect(expectedFinalTotal).toBe(actualTotal);
    })



})