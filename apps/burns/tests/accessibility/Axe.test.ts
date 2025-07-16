import test from '@burnsBase';
import { expect } from "@playwright/test";

test(`Verify Page Accessibility`, async ({ page, makeAxeBuilder }) => {
    await page.goto('https://www.burnsmcd.com/');
    const accessibilityScanResults = await makeAxeBuilder.analyze();
    // Automatically uses the shared AxeBuilder configuration,
    expect(accessibilityScanResults.violations).toEqual([]);});