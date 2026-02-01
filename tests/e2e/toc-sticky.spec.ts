import { test, expect } from '@playwright/test';

test.describe('TOC Sticky Behavior', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the test article with TOC enabled
    await page.goto('/post/toc-test/');
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('TOC sidebar should exist on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // Verify TOC sidebar exists
    const tocSidebar = page.locator('.post__toc-sidebar');
    await expect(tocSidebar).toBeVisible();

    // Verify TOC has sticky class
    const tocSticky = page.locator('.toc--sticky');
    await expect(tocSticky).toBeVisible();
  });

  test('TOC should have position:sticky CSS applied', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // Check that position:sticky is applied
    const tocSticky = page.locator('.toc--sticky');
    const position = await tocSticky.evaluate((el) => {
      return window.getComputedStyle(el).position;
    });

    expect(position).toBe('sticky');
  });

  test('TOC should stay visible when scrolling down (sticky behavior)', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // Get initial TOC position
    const tocSticky = page.locator('.toc--sticky');
    const initialBounds = await tocSticky.boundingBox();
    expect(initialBounds).not.toBeNull();

    // Scroll down significantly (to middle of article)
    await page.evaluate(() => {
      window.scrollTo(0, 600);
    });

    // Wait for scroll to complete
    await page.waitForTimeout(100);

    // Get TOC position after scroll
    const afterScrollBounds = await tocSticky.boundingBox();
    expect(afterScrollBounds).not.toBeNull();

    // TOC should still be visible in viewport
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    expect(afterScrollBounds!.y).toBeGreaterThanOrEqual(0);
    expect(afterScrollBounds!.y).toBeLessThan(viewportHeight);

    // The TOC should be near the top of the viewport (around top: 32px)
    // If sticky is working, y should be approximately 32px from top
    expect(afterScrollBounds!.y).toBeLessThanOrEqual(60); // Allow some margin
  });

  test('TOC should remain sticky while scrolling through article content', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    const tocSticky = page.locator('.toc--sticky');

    // Scroll through multiple positions and verify TOC stays visible
    const scrollPositions = [300, 600, 900, 1200];

    for (const scrollY of scrollPositions) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(50);

      const bounds = await tocSticky.boundingBox();
      expect(bounds).not.toBeNull();

      // TOC should be visible in viewport (y should be positive and reasonable)
      expect(bounds!.y).toBeGreaterThanOrEqual(0);
      expect(bounds!.y).toBeLessThan(100); // Should be near top when sticky
    }
  });

  test('TOC sidebar parent should stretch to match content height', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // Get heights of content and sidebar
    const articleHeight = await page.locator('.post--with-sidebar').evaluate((el) => el.getBoundingClientRect().height);
    const sidebarHeight = await page.locator('.post__toc-sidebar').evaluate((el) => el.getBoundingClientRect().height);

    // Sidebar should be at least as tall as the article content
    // This is required for sticky to work properly
    expect(sidebarHeight).toBeGreaterThanOrEqual(articleHeight * 0.9); // Allow 10% tolerance
  });

  test('TOC should not be sticky on mobile (responsive)', async ({ page }) => {
    // Set mobile viewport (below 1023px breakpoint)
    await page.setViewportSize({ width: 768, height: 1024 });

    // TOC should have static position on mobile
    const tocSticky = page.locator('.toc--sticky');
    const position = await tocSticky.evaluate((el) => {
      return window.getComputedStyle(el).position;
    });

    expect(position).toBe('static');
  });

  test('TOC should appear above content on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Get positions
    const tocBounds = await page.locator('.post__toc-sidebar').boundingBox();
    const articleBounds = await page.locator('.post--with-sidebar').boundingBox();

    expect(tocBounds).not.toBeNull();
    expect(articleBounds).not.toBeNull();

    // TOC should be above article (smaller y value)
    expect(tocBounds!.y).toBeLessThan(articleBounds!.y);
  });

  test('TOC should have correct top offset when sticky (32px)', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // Scroll down to activate sticky
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);

    // Check the computed top value
    const tocSticky = page.locator('.toc--sticky');
    const top = await tocSticky.evaluate((el) => {
      return window.getComputedStyle(el).top;
    });

    expect(top).toBe('32px');
  });

  test('TOC should have max-height constraint to prevent overflow', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    const tocSticky = page.locator('.toc--sticky');
    const maxHeight = await tocSticky.evaluate((el) => {
      return window.getComputedStyle(el).maxHeight;
    });

    // max-height should be calc(100vh - 64px), which is a px value after computation
    // Just verify it's set and not 'none'
    expect(maxHeight).not.toBe('none');
    // On a 800px viewport, calc(100vh - 64px) = 736px
    expect(parseInt(maxHeight)).toBeLessThanOrEqual(800);
  });

  test('TOC should be scrollable when content is long', async ({ page }) => {
    // Set desktop viewport with smaller height to test overflow
    await page.setViewportSize({ width: 1280, height: 600 });

    const tocSticky = page.locator('.toc--sticky');
    const overflowY = await tocSticky.evaluate((el) => {
      return window.getComputedStyle(el).overflowY;
    });

    expect(overflowY).toBe('auto');
  });

  test('TOC sticky behavior at breakpoint boundary (1024px)', async ({ page }) => {
    // Test at exactly 1024px (just above the 1023px breakpoint)
    await page.setViewportSize({ width: 1024, height: 800 });

    const tocSticky = page.locator('.toc--sticky');
    const position = await tocSticky.evaluate((el) => {
      return window.getComputedStyle(el).position;
    });

    // At 1024px, should still be sticky (breakpoint is max-width: 1023px)
    expect(position).toBe('sticky');
  });

  test('TOC should transition to static at 1023px', async ({ page }) => {
    // Test at exactly 1023px (at the breakpoint)
    await page.setViewportSize({ width: 1023, height: 800 });

    const tocSticky = page.locator('.toc--sticky');
    const position = await tocSticky.evaluate((el) => {
      return window.getComputedStyle(el).position;
    });

    // At 1023px, should be static
    expect(position).toBe('static');
  });

  test('TOC should remain in fixed position relative to viewport when scrolling', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    const tocSticky = page.locator('.toc--sticky');

    // Scroll to activate sticky
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(100);
    const bounds1 = await tocSticky.boundingBox();

    // Scroll more
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(100);
    const bounds2 = await tocSticky.boundingBox();

    // The Y position relative to viewport should be similar (sticky at top: 32px)
    // Allow small tolerance for rendering differences
    expect(Math.abs(bounds1!.y - bounds2!.y)).toBeLessThan(10);
  });

  test('TOC layout uses flex container correctly', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    const postContainer = page.locator('.post-container');

    // Check flex display
    const display = await postContainer.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    expect(display).toBe('flex');

    // Check gap
    const gap = await postContainer.evaluate((el) => {
      return window.getComputedStyle(el).gap;
    });
    expect(gap).toBe('32px');

    // Check align-items
    const alignItems = await postContainer.evaluate((el) => {
      return window.getComputedStyle(el).alignItems;
    });
    expect(alignItems).toBe('flex-start');
  });

  test('TOC sidebar has correct flex properties', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    const tocSidebar = page.locator('.post__toc-sidebar');

    // Check align-self is stretch (critical for sticky to work)
    const alignSelf = await tocSidebar.evaluate((el) => {
      return window.getComputedStyle(el).alignSelf;
    });
    expect(alignSelf).toBe('stretch');

    // Check order
    const order = await tocSidebar.evaluate((el) => {
      return window.getComputedStyle(el).order;
    });
    expect(order).toBe('2');
  });
});

test.describe('TOC Edge Cases', () => {
  test('Article without TOC should not show sidebar', async ({ page }) => {
    // Navigate to an article without TOC enabled
    await page.goto('/post/getting-started-with-hugo/');
    await page.waitForLoadState('networkidle');

    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });

    // TOC sidebar should not exist
    const tocSidebar = page.locator('.post__toc-sidebar');
    await expect(tocSidebar).toHaveCount(0);
  });
});
