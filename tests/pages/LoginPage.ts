import { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { BasePage } from './BasePage'

export default class LoginPage extends BasePage {
  private readonly login_button: Locator
  private readonly login_email: Locator
  private readonly login_form: Locator
  private readonly login_password: Locator

  constructor(public page: Page) {
    super(page)
    this.login_button = page.locator('[data-qa="login-button"]')
    this.login_email = page.locator('[data-qa="login-email"]')
    this.login_form = page.locator('.login-form')
    this.login_password = page.locator('[data-qa="login-password"]')
  }

  async typeEmailAndPassword(email: string, password: string) {
    await expect(this.login_form).toBeVisible()
    await this.login_email.fill(email)
    await this.login_password.fill(password)
    await expect(this.login_button).toBeEnabled()
    await this.login_button.click()
  }
}
