import { test, expect, Page } from '@playwright/test'
import LoginPage from '../pages/LoginPage'
import NavBar from '../pages/NavBar'

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.visit('/login')
  })

  test('should successfully login user', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const navBar = new NavBar(page)
    await loginPage.typeEmailAndPassword(
      process.env.EMAIL,
      process.env.PASSWORD
    )
    await navBar.logoutLinkVisible()
    // await page.pause()
  })
})
