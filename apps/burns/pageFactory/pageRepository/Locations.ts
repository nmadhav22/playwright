import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

let webActions: WebActions;

export class LocationsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly DALLAS: Locator;
    readonly DALLAS_ADDRESS: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.DALLAS = page.getByRole('link', { name: 'Dallas-Fort Worth, Texas' });
        this.DALLAS_ADDRESS = page.getByText('Gallerias North Tower I 13737');
    }

    async verifyDallasAndClick(): Promise<void> {
        await expect(this.DALLAS).toBeVisible();
        await this.DALLAS.click();
    }

    async validateDallasAddress(): Promise<void> {
        await expect(this.DALLAS_ADDRESS).toBeVisible();
    }
}