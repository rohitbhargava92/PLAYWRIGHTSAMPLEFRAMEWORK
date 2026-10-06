import { test, expect } from '@playwright/test';
import { BASE_URL, username, password } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { loginPageLocators } from '../locators/loginPageLocators';
import { productPageLocators } from '../locators/productPageLocators';
import { productsToBeAdded } from '../testData/products';

test.describe("Product Page Validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await page.goto(BASE_URL);
        await loginPage.loginToApplication(username, password);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })

    test("Validate Logout Functionality",async({page})=>{
        await productPage.logout();
        await expect(page.locator(loginPageLocators.loginButton)).toBeVisible();
    })

    test("Validate About Page and Go Back",async({page})=>{
        await productPage.openAboutPage();
        await expect(page.locator(productPageLocators.aboutPageHeader)).toBeVisible();
        await page.goBack();
        await expect(page.locator(productPageLocators.settingIcon)).toBeVisible();
    })

     test("Validate Product Page Products",async({page})=>{
        await productPage.validateAllProductDisplayed();
        await productPage.addFirstProductToCart();
        //Calling sams method again removed added product from cart
        await productPage.addFirstProductToCart();
        await productPage.addAllProductsToCart();
    })

      test("Validate Add Specific Product to cart",async({page})=>{
        await productPage.addSpecificProductsToCart(productsToBeAdded);
    })

    test("Validate Filter Names A to Z",async({page})=>{
        await productPage.filterProductsByAtoZ();
        const names= await productPage.getProductNames();
        const sortedNames=[...names].sort();
        expect(names).toEqual(sortedNames);
    })

    test("Validate Filter Names Z to A",async({page})=>{
         await productPage.filterProductsByZtoA();
        const names= await productPage.getProductNames();
        const sortedNames=[...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    })

    test("Validate Filter Prices Low to High",async({page})=>{
        await productPage.filterProductsPriceByLowToHigh();
        const prices= await productPage.getProductPrices();
        const sortedPrices=[...prices].sort((a,b)=>a-b);
        expect(prices).toEqual(sortedPrices);
    })

    
    test("Validate Filter Prices High to Low",async({page})=>{
         await productPage.filterProductsPriceByHighToLow();
        const prices= await productPage.getProductPrices();
        const sortedPrices=[...prices].sort((a,b)=>b-a);
        expect(prices).toEqual(sortedPrices);
    })
})