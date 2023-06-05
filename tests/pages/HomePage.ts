import { Locator, Page, selectors } from '@playwright/test'
import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export default class HomePage extends BasePage {
  private readonly homepage_featureitem_list: Locator
  private readonly homepage_featureitem: Locator
  private readonly homepage_featureitem_link: Locator
  private readonly homepage_addtocart: Locator
  private readonly homepage_viewcart: Locator

  constructor(public page: Page) {
    super(page)
    this.homepage_featureitem_list = page.locator('.features_items')
    this.homepage_featureitem = page.locator('.single-products')
    selectors.setTestIdAttribute('data-product-id')
    this.homepage_featureitem_link = page.getByTestId('2')
    this.homepage_addtocart = page.getByRole('link', { name: 'Add to cart' })
    this.homepage_viewcart = page.getByRole('link', { name: 'View Cart' })
  }

  async productListVisible() {
    await expect(this.homepage_featureitem_list).toBeVisible()
  }

  async hoverToFeatureItem() {
    await this.homepage_featureitem
      .getByAltText('ecommerce website products')
      .nth(2)
      .hover()
    await expect(this.homepage_featureitem_link.first()).toBeVisible()
  }

  async addItemToCart() {
    await this.homepage_featureitem_link.first().click()
    await expect(this.homepage_viewcart).toBeVisible()
  }

  async viewCart() {
    await this.homepage_viewcart.click()
    await expect(this.page).toHaveURL(
      new RegExp('https://automationexercise.com/view_cart')
    )
  }
}
