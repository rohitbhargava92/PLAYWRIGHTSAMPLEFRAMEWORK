import { finalPageLocators } from '../locators/finalPageLocators'
import { Page } from '@playwright/test';

export class FinalPage {

    constructor(private page: Page) {
    }

    async getFinalPageElements() {
        return {
            pageInfo: this.page.locator(finalPageLocators.pageInfo),
            successMsg: this.page.locator(finalPageLocators.completeOrderText),
            backHomeButton: this.page.locator(finalPageLocators.backHome)
        }
    }

    async getSuccessMessageText() {
        return await this.page.locator(finalPageLocators.completeOrderText).textContent();
    }

      async clickBackHomeButton() {
        await this.page.locator(finalPageLocators.backHome).click();
    }


}