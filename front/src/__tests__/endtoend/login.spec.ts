import { test, expect } from '@playwright/test'

test('Has heading Login', async ({ page }) => {
  await page.goto('http://localhost:3000/users/login')
  await expect(page.getByText('Login User')).toBeVisible()
})
