import { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export default class NavBar extends BasePage {
  private readonly logout: Locator

  constructor(public page: Page) {
    super(page)
    this.logout = page.getByRole('link', { name: 'Logout' })
  }

  async logoutLinkVisible() {
    await expect(this.logout).toBeVisible()
  }
}
