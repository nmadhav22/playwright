import test from '@lib/BaseTest';

test('Burns and McDonnell Validate Header Footer', async ({ homePage }) => {
  await homePage.navigateToURL();
  await homePage.verifyLogoExists();
  await homePage.verifyHeaderLinks();
});
