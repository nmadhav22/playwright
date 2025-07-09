import { test as baseTest } from '@playwright/test';
import { WebActions } from '@lib/WebActions';
import AxeBuilder from '@axe-core/playwright';

const test = baseTest.extend<{
  webActions: WebActions;
  makeAxeBuilder: AxeBuilder;
}>({
  webActions: async ({ page, context }, use) => {
    await use(new WebActions(page, context));
  },
  makeAxeBuilder: async ({ page }, use) => {
    await use(new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('#commonly-reused-element-with-known-issue'));
  }
})
export default test;