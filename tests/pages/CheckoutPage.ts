import { Locator, Page, selectors } from '@playwright/test'
import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export default class CheckoutPage extends BasePage {
  private readonly checkout_info: Locator
  private readonly checkout_place_order_btn: Locator

  constructor(public page: Page) {
    super(page)
    selectors.setTestIdAttribute('data-qa')
    this.checkout_info = page.getByTestId('checkout-info')
    this.checkout_place_order_btn = page.getByRole('link', {
      name: 'Place Order',
    })
  }

  async checkoutInfoIsVisible() {
    await expect(this.checkout_info).toBeVisible()
    await expect(this.checkout_info.getByRole('listitem').nth(1)).toHaveText(
      'Mr. Normz Test'
    )
  }

  async placeOrder() {
    await expect(this.checkout_place_order_btn).toBeVisible()
    await this.checkout_place_order_btn.click()
  }
}
