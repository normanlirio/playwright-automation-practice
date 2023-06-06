import { test, expect, Page } from '@playwright/test'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NavBar from '../pages/NavBar'

test.beforeEach(async ({ page }) => {
  await page.goto('/login')
})

test('should allow user to login', async ({ page }) => {
  const navBar = new NavBar(page)
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)
  const productId = '1'
  await loginPage.typeEmailAndPassword(process.env.EMAIL, process.env.PASSWORD)
  await navBar.logoutLinkVisible()
  await homePage.productListVisible()
  await homePage.hoverToFeatureItem(productId)
  await homePage.addItemToCart(productId)
  await homePage.viewCart(productId)
  await page.pause()
})
