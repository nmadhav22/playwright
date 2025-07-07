import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { ElementsPage } from '@pages/ElementsPage';
import { AlertsFrameWindowsPage } from '@pages/AlertsFrameWindowsPage';
import { WidgetsPage } from '@pages/WidgetsPage';
import { HomePage } from '@pages/HomePage';
import { LocationsPage } from '@pages/Locations';
import { InteractionsPage } from '@pages/InteractionsPage';
import { WebActions } from '@lib/WebActions';
import AxeBuilder from '@axe-core/playwright';

const test = baseTest.extend<{
  webActions: WebActions;
  loginPage: LoginPage;
  locationPage: LocationsPage;
  elementsPage: ElementsPage;
  alertsFrameWindowsPage: AlertsFrameWindowsPage;
  widgetsPage: WidgetsPage;
  interactionsPage: InteractionsPage;
  makeAxeBuilder: AxeBuilder;
  homePage: HomePage,
  testInfo: TestInfo;
}>({
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },
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
  makeAxeBuilder: async ({ page }, use) => {
    await use(new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('#commonly-reused-element-with-known-issue'));
  }
})

export default test;