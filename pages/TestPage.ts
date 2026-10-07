import{Page,Locator} from "@playwright/test";


//Example of Page Object Model with Locator and Page classes in Playwright. 
//This class represents a test page with username, password, and login button locators. 
// It provides methods to navigate to the page and perform login actions.
export class TestPage{
    readonly page:Page;
    readonly username:Locator;
    readonly password:Locator;
    readonly loginButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.username=page.locator("#user-name");
        this.password=page.locator("#password");
        this.loginButton=page.locator("#login-button");
    }

    async goto(){
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }



}