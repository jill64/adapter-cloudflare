import { expect, test } from '@playwright/test'

test('smoke', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: '@jill64/adapter-cloudflare' })
  ).toBeVisible()

  await expect(
    page.getByText("Buffer.from('Buffer Test').toString() = Buffer Test")
  ).toBeVisible()

  await expect(
    page.getByText(
      "crypto.timingSafeEqual(Buffer.from('123'), Buffer.from('123')) = true"
    )
  ).toBeVisible()
})
