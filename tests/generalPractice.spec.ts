import { test, expect } from '@playwright/test';

test.describe("Testing Multiple Available items in Playwright", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("https://the-internet.herokuapp.com/");
        await page.waitForLoadState('networkidle');
    });

    test("Validate CheckBoxes on Page", async ({ page }) => {
        await page.locator("a[href='/checkboxes']").click();
        await page.getByRole('checkbox').first().check();
        const checked = await page.getByRole('checkbox').nth(1).isChecked();
        expect(checked).toBe(true);
        await page.getByRole('checkbox').nth(1).uncheck();
    });

    test("Validate File Upload", async ({ page }) => {
        await page.locator("a[href='/upload']").click();
        await page.locator("#file-upload").setInputFiles("resources/testDoc.txt");
        await page.locator("#file-submit").click();
        await expect(page.locator("#uploaded-files")).toHaveText("testDoc.txt");
    });

    test("Validate Drag and Drop", async ({ page }) => {
        await page.locator("a[href='/drag_and_drop']").click();
        await page.locator("#column-a").dragTo(page.locator("#column-b"));
        const columnA = await page.locator("#column-a header").textContent();
        const columnB = await page.locator("#column-b header").textContent();
        expect(columnA).toBe("B");
        expect(columnB).toBe("A");
    });

    test("Validate Frames", async ({ page }) => {
        await page.locator("a[href='/frames']").click();
        await page.locator("a[href='/iframe']").click();
        const frame = page.frameLocator("#mce_0_ifr");
        await frame.locator("#tinymce").fill("This is a test message");
    });

    test("Validate New Tabs", async ({ page }) => {
        await page.locator("a[href='/windows']").click();
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.locator("a[href='/windows/new']").click()
        ]);
        await newPage.waitForLoadState('networkidle');
        const newPageText = await newPage.locator("h3").textContent();
        expect(newPageText).toBe("New Window");
        await newPage.close();
        await page.bringToFront();
    });

    test("Validate Dialogs", async ({ page }) => {
        await page.locator("a[href='/javascript_alerts']").click();

        //JS Alert
        await page.locator("button[onclick='jsAlert()']").click();
        await page.on('dialog', async dialog => {
            expect(dialog.message()).toBe("I am a JS Alert");
            await dialog.accept();
        });

        //JS Confirm
        await page.locator("button[onclick='jsConfirm()']").click();
        await page.on('dialog', async dialog => {
            expect(dialog.message()).toBe("I am a JS Confirm");
            await dialog.dismiss();
        });

        //JS Prompt
        await page.locator("button[onclick='jsPrompt()']").click();
        await page.on('dialog', async dialog => {
            expect(dialog.message()).toBe("I am a JS prompt");
            await dialog.accept("Test Prompt");
        });
    });

    test("Validate File Download", async ({ page }) => {
        await page.locator("a[href='/download']").click();
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator("#content a[href='download/ExampleFile.txt']").click()
        ]);
        await download.saveAs("downloads/ExampleFile.txt");
    });
})