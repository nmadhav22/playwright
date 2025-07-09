import base from '@lib/BaseTest';
import { LoginPage } from '@pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { AlertsFrameWindowsPage } from '@pages/AlertsFrameWindowsPage';
import { WidgetsPage } from '@pages/WidgetsPage';
import { HomePage } from '@pages/HomePage';
import { LocationsPage } from '@pages/Locations';
import { InteractionsPage } from '@pages/InteractionsPage';

const test = base.extend<{
  loginPage: LoginPage;
  locationPage: LocationsPage;
  elementsPage: ElementsPage;
  alertsFrameWindowsPage: AlertsFrameWindowsPage;
  widgetsPage: WidgetsPage;
  interactionsPage: InteractionsPage;
  homePage: HomePage;
}>({
  homePage: async ({ page, context }, use) => {
    await use(new HomePage(page, context));
  },
  loginPage: async ({ page, context }, use) => {
    await use(new LoginPage(page, context));
  },
  locationPage: async ({ page, context }, use) => {
    await use(new LocationsPage(page, context));
  },
  elementsPage: async ({ page, context }, use) => {
    await use(new ElementsPage(page, context));
  },
  alertsFrameWindowsPage: async ({ page, context }, use) => {
    await use(new AlertsFrameWindowsPage(page, context));
  },
  widgetsPage: async ({ page, context }, use) => {
    await use(new WidgetsPage(page, context));
  },
  interactionsPage: async ({ page, context }, use) => {
    await use(new InteractionsPage(page, context));
  },
});

export default test;
