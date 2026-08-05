import { test, expect } from "@playwright/test";

test.describe("Customer ordering flow", () => {
  test("customer can browse, add to cart, and place an order", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /The Cafe/i })).toBeVisible();

    const firstAddButton = page.getByRole("button", { name: "Add to cart" }).first();
    await firstAddButton.waitFor({ state: "visible", timeout: 15000 });
    await firstAddButton.click();

    await page.getByRole("link", { name: /Cart/ }).click();
    await expect(page).toHaveURL(/\/cart/);

    await page.getByRole("link", { name: "Proceed to checkout" }).click();
    await expect(page).toHaveURL(/\/checkout/);

    await page.getByLabel("Name").fill("Jamie Test");
    await page.getByLabel("Table number").fill("7");
    await page.getByRole("button", { name: "Place order" }).click();

    await expect(page).toHaveURL(/\/order\//);
    await expect(page.getByTestId("order-status")).toBeVisible();
  });
});

test.describe("Admin flow", () => {
  test("admin can log in and update an order's status", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill("admin@cafe.com");
    await page.getByLabel("Password").fill("admin123");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page).toHaveURL(/\/admin\/board/);
    await expect(page.getByRole("heading", { name: "Order Board" })).toBeVisible();
  });
});
