import { Page } from "@playwright/test";
import { productPageLocators } from "../locators/productPageLocators";

export class ProductPage{

    constructor(private page:Page){}

    async logout(){
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.logoutLink);
    }

    async openAboutPage(){
         console.log("Opening About Page");
         await this.page.click(productPageLocators.settingIcon);
         await this.page.click(productPageLocators.aboutLink);
    }

    async validateAllProductDisplayed(){
        console.log("Validating All Products are visible")
        const names= await this.page.locator(productPageLocators.productNames).allTextContents();
        const productDesc= await this.page.locator(productPageLocators.productDescription).allTextContents();
        const price= await this.page.locator(productPageLocators.productPrice).allTextContents();
        const addToCartButtonCount= await this.page.locator(productPageLocators.productAddToCartButton).count();

        if(names.length===0)
            throw new Error("No Product Names Found")
        if(names.length!==productDesc.length||names.length!==price.length|| names.length!==addToCartButtonCount)
            throw new Error("Product Length Mismatch. Please check UI")
    }

    async addFirstProductToCart(){
        await this.page.locator(productPageLocators.productAddToCartButton).first().click();
    }

    async addAllProductsToCart(){
        const buttons= this.page.locator(productPageLocators.productAddToCartButton);
        const count= await buttons.count();

        for(let i=0;i<count;i++){
            await buttons.nth(i).click();
            await this.page.waitForTimeout(300)
        }
    }

    async addSpecificProductsToCart(productNames: String[]){
        const buttons= this.page.locator(productPageLocators.productAddToCartButton);
        const count= await buttons.count();

        for(let i=0;i<count;i++){
            const productName= await this.page.locator(productPageLocators.productNames).nth(i).textContent();
            if(productName && productNames.includes(productName.trim())){
                await buttons.nth(i).click();
                await this.page.waitForTimeout(300)
            }
        }
    }

    async filterProductsByAtoZ(){
        await this.page.selectOption(productPageLocators.filterDropdown,"az")
    }

    async filterProductsByZtoA(){
        await this.page.selectOption(productPageLocators.filterDropdown,"za")
    }

    async filterProductsPriceByLowToHigh(){
        await this.page.selectOption(productPageLocators.filterDropdown,"lohi")
    }

    async filterProductsPriceByHighToLow(){
        await this.page.selectOption(productPageLocators.filterDropdown,"hilo")
    }

    async getProductNames(){
        return await this.page.locator(productPageLocators.productNames).allTextContents();
    }

    async getProductPrices(){
        const prices= await this.page.locator(productPageLocators.productPrice).allTextContents();
        return prices.map(price=>parseFloat(price.replace("$","")));
    }

    async clickOnCartLink(){
        await this.page.locator(productPageLocators.cartLink).click();
    }

    async getFirstProductDetails(){
        const name= await this.page.locator(productPageLocators.productNames).first().textContent();
        const description= await this.page.locator(productPageLocators.productDescription).first().textContent();
        const price= await this.page.locator(productPageLocators.productPrice).first().textContent();

        return{
            name: name?.trim(),
            description: description?.trim(),
            price:price?.trim()
        }
    }

    async getAllProductDetails(){
        const allNames= await this.page.locator(productPageLocators.productNames).allTextContents();
        const allDescription= await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allPrices= await this.page.locator(productPageLocators.productPrice).allTextContents();

        //array of objects[{names,description,prices},{names,description,prices},{names,description,prices}]
        const allProducts= allNames.map((_,i)=>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()
        }))
        return allProducts;
    }

    async getSpecificProductDetails(products:String[]){
        const allNames= await this.page.locator(productPageLocators.productNames).allTextContents();
        const allDescription= await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allPrices= await this.page.locator(productPageLocators.productPrice).allTextContents();

        //array of objects[{names,description,prices},{names,description,prices},{names,description,prices}]
        const allProducts= allNames.map((_,i)=>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()
        }))
        return allProducts.filter(p=>products.includes(p.name));
    }
}