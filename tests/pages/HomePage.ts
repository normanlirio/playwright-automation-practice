import { Locator, Page, selectors } from '@playwright/test'
import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export default class HomePage extends BasePage {
  private readonly homepage_featureitem_list: Locator
  private readonly homepage_featureitem: Locator
  private readonly homepage_viewcart: Locator
  private readonly viewcart_table: Locator
  private readonly viewcart_table_item: string

  constructor(public page: Page) {
    super(page)
    selectors.setTestIdAttribute('data-product-id')
    this.homepage_featureitem_list = page.locator('.features_items')
    this.homepage_featureitem = page.locator('.single-products')
    this.homepage_viewcart = page.getByRole('link', { name: 'View Cart' })
    this.viewcart_table = page.locator('#cart_info_table')
    this.viewcart_table_item = '#product-'
  }

  async productListVisible() {
    await expect(this.homepage_featureitem_list).toBeVisible()
  }

  async hoverToFeatureItem(productId: string) {
    const position = Number(productId) - 1
    await this.homepage_featureitem.getByRole('img').nth(position).hover()
    await expect(
      this.homepage_featureitem.getByRole('img').nth(position)
    ).toHaveAttribute('src', `/get_product_picture/${position + 1}`)
    const testId = (position + 1).toString()
    await expect(
      this.homepage_featureitem.getByTestId(testId).first()
    ).toHaveAttribute('data-product-id', testId)
  }

  async addItemToCart(testId: string) {
    await this.page.getByTestId(testId).first().click()
    await expect(this.homepage_viewcart).toBeVisible()
  }

  async viewCart(productid: string) {
    await this.homepage_viewcart.click()
    await expect(this.page).toHaveURL(
      new RegExp('https://automationexercise.com/view_cart')
    )
    await expect(this.viewcart_table.locator('tr').last()).toHaveAttribute(
      'id',
      'product-' + productid
    )
  }
}
