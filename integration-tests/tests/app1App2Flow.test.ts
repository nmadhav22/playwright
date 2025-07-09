import test from '../BaseTest';

test('integration flow using both apps', async ({ homePage, samplePage }) => {
  await homePage.navigateToURL();
  await homePage.verifyLogoExists();
  await samplePage.placeholder();
});
