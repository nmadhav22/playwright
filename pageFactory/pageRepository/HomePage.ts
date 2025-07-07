import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

let webActions: WebActions;

export class HomePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly BURNS_LOGO: Locator;
    readonly HEADER_LINKS: Locator;
    readonly LOCATIONS: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.BURNS_LOGO = page.getByRole('link', { name: 'Burns & McDonnell Logo white' });
        this.HEADER_LINKS = page.locator('#hs_cos_wrapper_main_menu').getByRole('link');
        this.LOCATIONS = page.getByRole('contentinfo').getByRole('link', { name: 'Locations' });
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/");
    }

    async verifyHeaderLinks(): Promise<void> {
        const linkTexts = await this.HEADER_LINKS.allTextContents();
        const expectedTexts = ['Who We Are', 'What We Do', 'Insights & News', 'Careers'];
        expect(linkTexts).toEqual(expectedTexts);
    }

    async verifyLogoExists(): Promise<void> {
        await expect(this.BURNS_LOGO).toBeVisible();
    }

    async clickLocations(): Promise<void> {
        await this.LOCATIONS.click();
    }
}