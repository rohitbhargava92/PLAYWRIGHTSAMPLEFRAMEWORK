# Playwright Sample Framework

A sample end-to-end test automation framework built with Playwright and TypeScript for the SauceDemo web application. The project follows the Page Object Model (POM) design pattern and includes browser coverage, environment-based execution, and Allure reporting.

## Overview

This framework is designed to automate common user flows such as:

- Login
- Product listing and filtering
- Cart validation
- Checkout flow
- Order completion
- Cross-browser UI testing

It uses Playwright's built-in test runner and is structured to be easy to extend for additional scenarios.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Allure Playwright
- Page Object Model (POM)

## Project Structure

```text
PlaywrightSampleFramework/
├── fixtures/
│   └── auth.fixture.ts
├── global-setup/
│   ├── setup.ts
│   └── teardown.ts
├── locators/
│   ├── cartPageLocators.ts
│   ├── checkoutOverviewLocators.ts
│   ├── checkoutPageLocators.ts
│   ├── finalPageLocators.ts
│   ├── loginPageLocators.ts
│   └── productPageLocators.ts
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutOverviewPage.ts
│   ├── CheckoutPage.ts
│   ├── FinalPage.ts
│   ├── LoginPage.ts
│   └── ProductPage.ts
├── testData/
│   ├── products.ts
│   └── userDetails.ts
├── tests/
│   ├── cart.spec.ts
│   ├── checkoutOverview.spec.ts
│   ├── checkoutPage.spec.ts
│   ├── finalPage.spec.ts
│   ├── login.spec.ts
│   ├── mobileTest.spec.ts
│   ├── practice.spec.ts
│   ├── productPage.spec.ts
│   └── E2E/
│       └── finalPage.spec.ts
├── utils/
│   └── envConfig.ts
├── allure-results/
├── playwright-report/
├── test-results/
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
└── .gitignore
```

## Prerequisites

Before running the tests, ensure you have:

- Node.js (recommended LTS)
- npm
- Playwright browsers installed

Install dependencies:

```bash
npm install
npx playwright install
```

## Configuration

The project uses environment-based URLs configured in [utils/envConfig.ts](utils/envConfig.ts).

Supported environments:

- dev
- qa
- stage
- prod

Default environment is `qa` if no environment is provided.

The default credentials used by the sample tests are:

- Username: `standard_user`
- Password: `secret_sauce`

## Running Tests

Run all tests:

```bash
npm test
```

Run in headed mode:

```bash
npm run test:headed
```

Run in debug mode:

```bash
npm run test:debug
```

Open the Playwright UI mode:

```bash
npm run test:ui
```

Run tests for a specific browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Run tests by environment:

```bash
npm run test:dev
npm run test:qa
npm run test:stage
npm run test:prod
```

## Example Commands

```bash
npx playwright test tests/login.spec.ts
npx playwright test --project=chromium
npx playwright test --headed
```

## Reporting

This project is configured to generate:

- Playwright test results in the terminal
- Allure reports via the `allure-playwright` reporter
- Playwright HTML report in the `playwright-report/` folder

## Test Design Pattern

The framework follows a Page Object Model structure:

- Page classes encapsulate UI interactions
- Locator files store selectors
- Test files define scenarios and assertions
- Test data is separated into reusable data objects
- Environment settings are centralized in one config file

This keeps the test suite maintainable and easier to scale.

## Notes

- The target application used in this sample is SauceDemo.
- The configuration supports multi-browser runs.
- The suite is designed for learning and extension, especially for automation interviews, sample frameworks, and POM-based UI test projects.

## License

This project is licensed under ISC.
