import { test, expect } from '@playwright/test';
import { BASE_URL, username, password } from '../utils/envConfig';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { productsToBeAdded } from '../testData/products';
import { CartPage } from '../pages/CartPage';

test.describe("Cart Page Validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await page.goto(BASE_URL);
        await loginPage.loginToApplication(username, password);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })

    test("Validate Cart Page URL and UI Elements",async({page})=>
    {
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
        const UIElements= await cartPage.getCartPageElements();
        await expect(UIElements.cartTitle).toBeVisible();
        await expect(UIElements.shoppingCart).toBeVisible();
        await expect(UIElements.checkout).toBeVisible();
    })

    test("Validate Continue Shopping Functionality",async({page})=>
    {
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickOnContinueShopping();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    })

    test("Validate First Product in Cart Page",async({page})=>
    {
        const firstProduct=await productPage.getFirstProductDetails();
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        const cartProduct= await cartPage.getCartProducts();
        expect(cartProduct[0]).toEqual(firstProduct);
    })

    test("Validate All Products in Cart Page",async({page})=>
    {
        const allProductDetails= await productPage.getAllProductDetails();
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        const cartProducts= await cartPage.getCartProducts();
         expect(cartProducts).toEqual(allProductDetails);
    })

    test("Validate Specific Product in Cart Page",async({page})=>
    {
        const getSpecificProductDetails= await productPage.getSpecificProductDetails(productsToBeAdded);
        await productPage.addSpecificProductsToCart(productsToBeAdded);
        await productPage.clickOnCartLink();
        const cartProducts= await cartPage.getCartProducts();
        expect(cartProducts).toEqual(getSpecificProductDetails);
    })

    test("Validate remove Product Functionality",async({page})=>
    {
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        const initialProductsCount= await cartPage.getCartProducts();
        expect(initialProductsCount.length).toBeGreaterThan(0);
        await cartPage.removeFirstProduct();
        const updatedProductsCount= await cartPage.getCartProducts(); 
        expect(updatedProductsCount.length).toBe(initialProductsCount.length-1)
    })
})