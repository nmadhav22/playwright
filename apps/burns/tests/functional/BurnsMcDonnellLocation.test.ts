import test from '@burnsBase';

test('BMW-T1 Burns and McDonnell Validate Header Footer', async ({ homePage, locationPage }) => {
  await homePage.navigateToURL();
  await homePage.clickLocations();
  await locationPage.verifyDallasAndClick();
  await locationPage.validateDallasAddress();
});
