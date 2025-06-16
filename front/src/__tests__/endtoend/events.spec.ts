import { test, expect } from '@playwright/test'

test('Has heading Event', async ({ page }) => {
  await page.goto('http://localhost:3000/users/login')
  await page.getByPlaceholder('User Name').fill('Szymon')
  await page.getByPlaceholder('Password').fill('somepassword')

  await page.getByRole('button').click()

  await expect(page.getByText('Szymon')).toBeVisible()

  await page.click('text=CreateEvent')

  await expect(page.getByText('Create Event')).toBeVisible()
})
