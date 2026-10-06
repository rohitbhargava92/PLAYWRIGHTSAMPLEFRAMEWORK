import { loginPageLocators } from "../locators/loginPageLocators";
import {Page} from '@playwright/test';

export class LoginPage{

    constructor(private page:Page){
    }

    async loginToApplication(username:string, password:string){
        await this.page.fill(loginPageLocators.username,username);
        await this.page.fill(loginPageLocators.password,password);
        await this.page.click(loginPageLocators.loginButton);
    }
}