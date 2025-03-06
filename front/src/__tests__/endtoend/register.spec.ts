import { test, expect } from '@playwright/test'

test('Has heading Register User.', async ({ page }) => {
  await page.goto('http://localhost:3000/users/register')
  await expect(page.getByText('Register User')).toBeVisible()
})
test(`Fill form, submit. Has confirmation message.`, async ({ page }) => {
  await page.goto('http://localhost:3000/users/register')
  await page.getByPlaceholder('User Name').fill('Szymon')
  await page.getByPlaceholder('Email').fill('szymondawidowicz@fastmail.com')
  await page.getByPlaceholder('Password').fill('szcccdfghhj')

  await page.getByRole('button').click()

  await expect(page.getByText(`We've sent you email, please read.`)).toBeVisible()
})
