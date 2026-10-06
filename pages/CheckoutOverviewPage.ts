import { Page } from "@playwright/test";
import { checkoutOverviewLocators } from "../locators/checkoutOverviewLocators";

export class CheckoutOverviewPage {
    constructor(private page: Page) { }


    async getCheckoutOverviewElements() {
        return {
            pageInfo: this.page.locator(checkoutOverviewLocators.pageinfo),
            cancelButton: this.page.locator(checkoutOverviewLocators.cancelButton),
            finishButton: this.page.locator(checkoutOverviewLocators.finishButton),
        }
    }

    async getCheckoutOverviewProducts() {
        const allNames = await this.page.locator(checkoutOverviewLocators.productNames).allTextContents();
        const allDescription = await this.page.locator(checkoutOverviewLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(checkoutOverviewLocators.productPrice).allTextContents();

        //array of objects[{names,description,prices},{names,description,prices},{names,description,prices}]
        const allCartProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()
        }))
        return allCartProducts;
    }

    async getItemTotal(){
        const total= await this.page.locator(checkoutOverviewLocators.itemTotal).textContent();
        return parseFloat(total!.replace("Item total: $","").trim());
    }

    async getItemTax(){
        const tax= await this.page.locator(checkoutOverviewLocators.tax).textContent();
        return parseFloat(tax!.replace("Tax: $","").trim());
    }

    async getTotal(){
        const total= await this.page.locator(checkoutOverviewLocators.total).textContent();
        return parseFloat(total!.replace("Total: $","").trim());
    }

    async clickCancel(){
        await this.page.locator(checkoutOverviewLocators.cancelButton).click();
    }

     async clickFinish(){
        await this.page.locator(checkoutOverviewLocators.finishButton).click();
    }
}