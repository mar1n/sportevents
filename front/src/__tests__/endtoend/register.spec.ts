import { test, expect } from '@playwright/test'

test('has heading Register User', async ({ page }) => {
  await page.goto('http://localhost:3000/users/register')
  await expect(page.getByText('Register User')).toBeVisible()
})
