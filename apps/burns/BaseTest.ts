import base from '@lib/BaseTest';
import { HomePage } from '@pages/HomePage';
import { LocationsPage } from '@pages/Locations';

const test = base.extend<{
  locationPage: LocationsPage;
  homePage: HomePage;
}>({
  homePage: async ({ page, context }, use) => {
    await use(new HomePage(page, context));
  },
  locationPage: async ({ page, context }, use) => {
    await use(new LocationsPage(page, context));
  },
});

export default test;
