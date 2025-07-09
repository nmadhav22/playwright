import test from '@app1Base';
import { expect } from '@playwright/test';

// Automation script: Navigate to 'What We Do' > 'Services' and validate all service links

test('Burns & McDonnell: Validate all Services links under What We Do', async ({ page }) => {
  await page.goto('https://www.burnsmcd.com/');

  // Click on 'What We Do' in the main navigation
  await page.getByRole('link', { name: /What We Do/i }).click();

  // Click on 'Services' in the dropdown or on the What We Do page
  // Try both direct link and visible text
  const servicesLink = page.getByRole('link', { name: /Services/i });
  await expect(servicesLink).toBeVisible();
  await servicesLink.click();

  // Wait for the Services page to load
  await expect(page).toHaveURL(/services/i);

  // Find all service links (assume they are anchor tags under a section or list)
  const serviceLinks = page.locator('a[href*="/services/"]');
  const count = await serviceLinks.count();
  expect(count).toBeGreaterThan(0);

  // Validate each service link opens successfully
  for (let i = 0; i < count; i++) {
    const href = await serviceLinks.nth(i).getAttribute('href');
    if (!href) continue;
    const newPage = await page.context().newPage();
    await newPage.goto(href.startsWith('http') ? href : `https://www.burnsmcd.com${href}`);
    await expect(newPage).toHaveTitle(/.+/); // Page should have a title
    await newPage.close();
  }
});
