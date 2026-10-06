import { Page } from "@playwright/test";
import { checkoutPageLocators } from "../locators/checkoutPageLocators";

export class CheckoutPage {
    constructor(private page: Page) { }

    async getCheckoutElements(){
        return{
            pageInfo: this.page.locator(checkoutPageLocators.pageInfo),
            cancelButton: this.page.locator(checkoutPageLocators.cancelButton),
            continueButton: this.page.locator(checkoutPageLocators.continueButton),
        }
    }

    async fillCheckoutDetails(firstName:string, lastName:string, postalCode: string){
        await this.page.locator(checkoutPageLocators.firstName).fill(firstName);
        await this.page.locator(checkoutPageLocators.lastName).fill(lastName);
        await this.page.locator(checkoutPageLocators.postalCode).fill(postalCode);
    }

    async clickCancelButton(){
         await this.page.locator(checkoutPageLocators.cancelButton).click();
    }

    async clickContinueButton(){
         await this.page.locator(checkoutPageLocators.continueButton).click();
    }

    async getErrorMessage(){
        return await this.page.locator(checkoutPageLocators.errorMessage).textContent();
    }

}