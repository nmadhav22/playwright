import test from '@app1Base';
import { expect } from '@playwright/test';

// Automation script: Search for 'project' and verify first five links

test('Burns & McDonnell: Search for project and verify first five links', async ({ page }) => {
  await page.goto('https://www.burnsmcd.com/');

  // Click on the search button (usually a magnifier icon in header)
  // Try common selectors for search icon/button
  const searchButton = page.locator('button[aria-label*="Search"], button[title*="Search"], [class*="search"], [class*="icon-search"]');
  await expect(searchButton.first()).toBeVisible();
  await searchButton.first().click();

  // Wait for search input to appear
  const searchInput = page.locator('input[type="search"], input[aria-label*="Search"], input[placeholder*="Search"]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill('project');
  await searchInput.press('Enter');

  // Wait for search results to load
  const results = page.locator('a[href^="/"], .search-results a');
  await expect(results.first()).toBeVisible();

  // Get first five result links
  const links = await results.evaluateAll((els) => els.slice(0, 5).map(e => e.getAttribute('href')));

  for (const href of links) {
    if (!href) continue;
    // Open each link in a new tab and check it loads without error
    const newPage = await page.context().newPage();
    await newPage.goto(href.startsWith('http') ? href : `https://www.burnsmcd.com${href}`);
    await expect(newPage).toHaveTitle(/.+/); // Page should have a title
    await newPage.close();
  }
});
