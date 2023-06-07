import { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export default class ViewCartPage extends BasePage {
  private readonly view_cart_btn_proceed: Locator

  constructor(public page: Page) {
    super(page)
    this.view_cart_btn_proceed = page.getByText('Proceed To Checkout')
  }

  async proceedToCheckout() {
    await expect(this.view_cart_btn_proceed).toBeVisible()
    await expect(this.view_cart_btn_proceed).toHaveText('Proceed To Checkout')
    await this.view_cart_btn_proceed.click()
  }
}
