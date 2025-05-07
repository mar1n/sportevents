import { test, expect } from '@playwright/test'

test('User has access to accout page after login', async ({ page }) => {
  await page.goto('http://localhost:3000/users/login')
  await page.getByPlaceholder('User Name').fill('Szymon')
  await page.getByPlaceholder('Password').fill('somepassword')

  await page.getByRole('button').click()

  await expect(page.getByText('Name: Szymon Dawidowicz')).toBeVisible()
})
test('User doesnt have access', async ({ page }) => {
  await page.goto('http://localhost:3000/users/account')
  await expect(page.getByText('Please login to have access to page.')).toBeVisible()
})
