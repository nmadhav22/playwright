import base from '@lib/BaseTest';
import { HomePage } from '@pages/HomePage';
import { LocationsPage } from '@pages/Locations';

export const fixtures = {
  homePage: async ({ page, context }, use: (r: HomePage) => Promise<void>) => {
    await use(new HomePage(page, context));
  },
  locationPage: async (
    { page, context },
    use: (r: LocationsPage) => Promise<void>
  ) => {
    await use(new LocationsPage(page, context));
  },
};

const test = base.extend<{
  locationPage: LocationsPage;
  homePage: HomePage;
}>(fixtures);

export default test;
