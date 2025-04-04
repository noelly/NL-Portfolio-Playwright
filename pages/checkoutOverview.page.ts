import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutOverview extends BasePage{
  readonly finishBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.finishBtn = page.getByTestId("finish");
  }
}
