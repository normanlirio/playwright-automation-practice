import { test, expect, Page } from '@playwright/test'
import CheckoutPage from '../pages/CheckoutPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NavBar from '../pages/NavBar'
import ViewCartPage from '../pages/ViewCartPage'

test('should allow user to login', async ({ page }) => {
  await page.goto('/login')
  const checkout = new CheckoutPage(page)
  const navBar = new NavBar(page)
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page)
  const viewCart = new ViewCartPage(page)
  const productId = '1'
  await loginPage.typeEmailAndPassword(process.env.EMAIL, process.env.PASSWORD)
  await navBar.logoutLinkVisible()
  await homePage.productListVisible()
  await homePage.hoverToFeatureItem(productId)
  await homePage.addItemToCart(productId)
  await homePage.viewCart(productId)
  await viewCart.proceedToCheckout()
  await checkout.checkoutInfoIsVisible()
  await checkout.placeOrder()
  await page.pause()
})
