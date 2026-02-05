import { test, expect } from '@playwright/test';

test.describe('Back to top button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/post/basic-elements/');
    await page.waitForLoadState('networkidle');
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test('is fixed in the bottom-right corner', async ({ page }) => {
    const button = page.locator('.back-to-top');
    await expect(button).toHaveCount(1);

    const styles = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return { position: computed.position, right: computed.right, bottom: computed.bottom };
    });

    expect(styles.position).toBe('fixed');
    expect(styles.right).not.toBe('auto');
    expect(styles.bottom).not.toBe('auto');
  });

  test('scrolls back to the top when clicked', async ({ page }) => {
    const button = page.locator('.back-to-top');
    await expect(button).toHaveCount(1);

    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(100);

    await expect(button).toBeVisible();
    await button.click();

    await page.waitForFunction(() => window.scrollY <= 1);
    await expect(button).not.toBeVisible();
  });
});

