import test, { Locator, Page } from '@playwright/test'

export class BasePage {
  constructor(public page: Page) {}

  async visit(url: string) {
    await this.page.goto(url)
  }
}
