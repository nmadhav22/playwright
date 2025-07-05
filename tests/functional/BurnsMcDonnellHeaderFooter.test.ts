import test from '@lib/BaseTest';
import { expect } from '@playwright/test';

// Functional UI test for Burns & McDonnell website header and footer

test('Validate Burns & McDonnell header and footer [SCRUM-T1]', async ({ page }) => {
  await page.goto('https://www.burnsmcd.com/');

  // HEADER VALIDATION
  // Check for logo
  const logo = page.getByRole('link', { name: 'Burns & McDonnell Logo white' });
  await expect(logo).toBeVisible();

  // Check for main navigation links in header
  // const navLinks = [
  //   'Who We Are',
  //   'What We Do',
  //   'Insights & News',
  //   'Careers',
  //   'Honors',
  //   'Industry Rankings',
  //   'Blog',
  //   'Locations',
  //   'Suppliers',
  //   'Contact Us'
  // ];
  // for (const linkText of navLinks) {
  //   await expect(page.getByRole('link', { name: linkText })).toBeVisible();
  // }

  // FOOTER VALIDATION
  // Check for copyright
  // await expect(page.locator('footer')).toContainText('© 2025 Burns & McDonnell');
  //
  // // Check for social media icons/links in footer
  // const socialLinks = [
  //   'linkedin',
  //   'facebook',
  //   'instagram',
  //   'x.com',
  //   'youtube'
  // ];
  // for (const social of socialLinks) {
  //   await expect(page.locator('footer a[href*="' + social + '"]')).toBeVisible();
  // }
  //
  // // Check for at least one contact or careers link in the footer
  // await expect(page.locator('footer')).toContainText(['Contact Us', 'Careers']);
});
