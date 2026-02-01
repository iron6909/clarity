import { test, expect } from '@playwright/test';

/**
 * Tablet Responsive Layout Tests
 *
 * Tests the fix for content overflow on tablet devices (768px - 1023px).
 *
 * Root Cause: .primary { flex: 1 0 70% } was constraining content width
 * on tablets, causing code blocks and other wide content to overflow.
 *
 * Fix: Added .primary { flex: 1 0 100% } in @media screen and (max-width: 1023px)
 */

test.describe('Tablet Layout (768px)', () => {
  const TABLET_VIEWPORT = { width: 768, height: 1024 };

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(TABLET_VIEWPORT);
  });

  test('should set .primary to 100% width on tablet', async ({ page }) => {
    await page.goto('/post/basic-elements/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Get the .primary element width
    const primary = page.locator('.primary');
    const primaryWidth = await primary.evaluate(el => el.getBoundingClientRect().width);

    // Get the wrapper width (the flex container)
    const wrapper = page.locator('.wrapper.flex');
    const wrapperWidth = await wrapper.evaluate(el => el.getBoundingClientRect().width);

    // On tablet, .primary should be close to wrapper width (100% of flex container)
    // The sidebar is hidden on mobile/tablet, so .primary should take full width
    const tolerance = 50; // Allow for margins and padding

    expect(primaryWidth).toBeGreaterThan(wrapperWidth - tolerance);

    console.log(`Wrapper width: ${wrapperWidth}px`);
    console.log(`Primary width: ${primaryWidth}px`);

    // The key assertion: primary should be much wider than the old 70% would give
    // Old behavior: wrapperWidth * 0.7 ≈ 537px
    // New behavior: should be close to wrapperWidth
    const oldBehaviorWidth = wrapperWidth * 0.7;
    expect(primaryWidth).toBeGreaterThan(oldBehaviorWidth + 50); // At least 50px more than 70%
  });

  test('should prevent content overflow', async ({ page }) => {
    await page.goto('/post/basic-elements/');

    await page.waitForLoadState('networkidle');

    // Check that .post--with-sidebar width equals .primary width
    const primary = page.locator('.primary');
    const postWithSidebar = page.locator('.post--with-sidebar');

    const primaryWidth = await primary.evaluate(el => el.getBoundingClientRect().width);
    const postWidth = await postWithSidebar.evaluate(el => el.getBoundingClientRect().width);

    // They should be the same width (post should not overflow)
    expect(postWidth).toBeLessThanOrEqual(primaryWidth + 1);
  });

  test('should handle code blocks with overflow-x scroll', async ({ page }) => {
    await page.goto('/post/basic-elements/');

    await page.waitForLoadState('networkidle');

    // Find code blocks
    const codeBlocks = page.locator('pre');

    const count = await codeBlocks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const block = codeBlocks.nth(i);

      // Check that code block has max-width: 100%
      const maxWidth = await block.evaluate(el => {
        return window.getComputedStyle(el).maxWidth;
      });

      expect(maxWidth).toBe('100%');

      // Check that overflow-x is auto
      const overflowX = await block.evaluate(el => {
        return window.getComputedStyle(el).overflowX;
      });

      expect(overflowX).toMatch(/auto|scroll/);
    }
  });

  test('should handle wide tables with scroll', async ({ page }) => {
    await page.goto('/post/basic-elements/');

    await page.waitForLoadState('networkidle');

    // Find tables
    const tables = page.locator('table');

    const count = await tables.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const table = tables.nth(i);

        // Check that table has max-width: 100%
        const maxWidth = await table.evaluate(el => {
          return window.getComputedStyle(el).maxWidth;
        });

        expect(maxWidth).toBe('100%');

        // Check that table has overflow handling
        const overflowX = await table.evaluate(el => {
          return window.getComputedStyle(el).overflowX;
        });

        expect(overflowX).toMatch(/auto|scroll/);
      }
    }
  });

  test('TOC sidebar should move to top on tablet', async ({ page }) => {
    await page.goto('/post/toc-sticky-test/');

    await page.waitForLoadState('networkidle');

    // Find TOC sidebar - use a page that actually has TOC
    const tocSidebar = page.locator('.post__toc-sidebar').first();

    // Check if TOC exists
    const count = await tocSidebar.count();
    if (count === 0) {
      test.skip();
      return;
    }

    // Check that TOC has max-width: 100% on tablet
    const maxWidth = await tocSidebar.evaluate(el => {
      return window.getComputedStyle(el).maxWidth;
    });

    expect(maxWidth).toBe('100%');
  });
});

test.describe('iPad Pro (1024px)', () => {
  const IPAD_PRO_VIEWPORT = { width: 1024, height: 1366 };

  test('should handle larger tablets', async ({ page }) => {
    await page.setViewportSize(IPAD_PRO_VIEWPORT);
    await page.goto('/post/basic-elements/');

    await page.waitForLoadState('networkidle');

    // At 1024px, we're at the boundary
    // The media query is max-width: 1023px, so at 1024px
    // the desktop layout should apply (70% .primary)

    const primary = page.locator('.primary');
    const container = page.locator('.wrapper');

    const primaryWidth = await primary.evaluate(el => el.getBoundingClientRect().width);
    const containerWidth = await container.evaluate(el => el.getBoundingClientRect().width);

    // At 1024px, should still use desktop layout (approximately 70%)
    const expectedWidth = containerWidth * 0.7;
    const tolerance = 50;

    expect(primaryWidth).toBeGreaterThan(expectedWidth - tolerance);
    expect(primaryWidth).toBeLessThan(expectedWidth + tolerance);

    console.log(`iPad Pro - Container: ${containerWidth}px, Primary: ${primaryWidth}px`);
  });
});

test.describe('Small Tablet (600px)', () => {
  const SMALL_TABLET_VIEWPORT = { width: 600, height: 800 };

  test('should handle small tablets properly', async ({ page }) => {
    await page.setViewportSize(SMALL_TABLET_VIEWPORT);
    await page.goto('/post/basic-elements/');

    await page.waitForLoadState('networkidle');

    // At 600px, should use the tablet fix
    const primary = page.locator('.primary');
    const postWithSidebar = page.locator('.post--with-sidebar');

    const primaryWidth = await primary.evaluate(el => el.getBoundingClientRect().width);
    const postWidth = await postWithSidebar.evaluate(el => el.getBoundingClientRect().width);

    // Content should not overflow
    expect(postWidth).toBeLessThanOrEqual(primaryWidth + 1);

    console.log(`Small Tablet - Primary: ${primaryWidth}px, Post: ${postWidth}px`);
  });
});

test.describe('Regression Tests', () => {
  test('desktop layout should not be affected', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/post/basic-elements/');

    await page.waitForLoadState('networkidle');

    // On desktop, .primary should be ~70%
    const primary = page.locator('.primary');
    const container = page.locator('.wrapper');

    const primaryWidth = await primary.evaluate(el => el.getBoundingClientRect().width);
    const containerWidth = await container.evaluate(el => el.getBoundingClientRect().width);

    const ratio = primaryWidth / containerWidth;

    // Should be approximately 70%
    expect(ratio).toBeGreaterThan(0.65);
    expect(ratio).toBeLessThan(0.75);

    console.log(`Desktop - Container: ${containerWidth}px, Primary: ${primaryWidth}px, Ratio: ${ratio.toFixed(2)}`);
  });

  test('mobile layout should not be affected', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/post/basic-elements/');

    await page.waitForLoadState('networkidle');

    // On mobile, .flex should be display: block in the main wrapper
    const wrapper = page.locator('.wrapper.flex');
    const display = await wrapper.evaluate(el => {
      return window.getComputedStyle(el).display;
    });

    // Should be block on mobile (due to separate media query at 767px)
    expect(display).toBe('block');

    // Sidebar should have 100% width (accounting for box-sizing)
    const sidebar = page.locator('.sidebar');
    const sidebarWidth = await sidebar.evaluate(el => {
      return el.getBoundingClientRect().width;
    });

    // Should be close to viewport width (allowing for padding)
    expect(sidebarWidth).toBeGreaterThan(300);
  });
});
