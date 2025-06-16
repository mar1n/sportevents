import { test, expect } from '@playwright/test'

test.describe('Create Events', () => {
  test('Has heading Create Event', async ({ page }) => {
    await page.goto('http://localhost:3000/users/login')
    await page.getByPlaceholder('User Name').fill('Szymon')
    await page.getByPlaceholder('Password').fill('somepassword')

    await page.getByRole('button').click()

    await expect(page.getByText('Szymon')).toBeVisible()

    await page.click('text=CreateEvent')

    await expect(page.locator('h1')).toContainText('Create Event')
  })

  test('Create Event', async ({ page }) => {
    await page.goto('http://localhost:3000/users/login')
    await page.getByPlaceholder('User Name').fill('Szymon')
    await page.getByPlaceholder('Password').fill('somepassword')

    await page.getByRole('button').click()

    await expect(page.getByText('Szymon')).toBeVisible()

    await page.click('text=CreateEvent')

    await expect(page.locator('h1')).toContainText('Create Event')

    await page.getByPlaceholder('Title').fill('NBA Game')
    await page
      .getByPlaceholder('Description')
      .fill('Game between Chicago Bulls and Los Angeles Lakers')
    await page.getByPlaceholder('Location').fill('London O2 Arena')
    await page.getByPlaceholder('Address').fill('W10 6MM')
    await page.getByPlaceholder('StartEvent').fill('10/11/2026 8:00pm')
    await page.getByPlaceholder('EndEvent').fill('10/11/2026 11:00pm')

    await page.getByRole('button').click()

    await expect(page.getByText('Event created successfully')).toBeVisible()
  })
})

test.describe('Display events', () => {
  test('Display events', async ({ page }) => {
    await page.goto('http://localhost:3000/users/login')
    await page.getByPlaceholder('User Name').fill('Szymon')
    await page.getByPlaceholder('Password').fill('somepassword')

    await page.getByRole('button').click()

    await expect(page.getByText('Szymon')).toBeVisible()

    await page.click('text=DisplayEvent')
  })
})
