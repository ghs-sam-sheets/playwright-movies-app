import { expect } from "@playwright/test";
import { listTest as test } from "../helpers/list-test";

test.describe("Movies List Management", () => {
  test("should create new movie list successfully", async ({ listPage }) => {
    const page = listPage; // Set the page to the list page fixture
    
    // 2. Open user profile menu
    await page.getByRole("button", { name: "User Profile" }).click();
    
    // 3. Click on "Create New List" link
    await page.getByRole("link", { name: "Create New List" }).click();

    // 3. Fill in list name: "Test Movie Collection"
    await page.getByRole("textbox", { name: "Name" }).fill("Test Movie Collection");

    // 4. Fill in list description: "A collection of test movies"
    await page.getByRole("textbox", { name: "Description" }).fill("A collection of test movies");

    // 5. Click "Continue" button
    await page.getByRole("button", { name: "Continue" }).click();

    // Verify page header displays the list name "Test Movie Collection"
    await expect(page.getByText("Test Movie Collection")).toBeVisible();

    // Verify URL contains the new list ID parameter
    expect(page.url()).toContain("listId=");
    
    // Verify user navigates to add/remove movies page for the new list
    expect(page.url()).toContain("/list/add-or-remove-items");
  });

  test("should edit list name and description successfully", async ({ listPage }) => {
    const page = listPage; // Set the page to the list page fixture

    // 1. Navigate to "Edit List" page
    await page.getByRole("link", { name: "Edit" }).click();

    // 2. Update list name to "Updated Movie Collection"
    await page.getByRole("textbox", { name: "Name" }).fill("Updated Movie Collection");

    // 3. Update description to "Updated description for test movies"
    await page.getByRole("textbox", { name: "Description" }).fill("Updated description for test movies");

    // 4. Change privacy setting to "No" (Private)
    await page.getByRole("combobox", { name: "Public List?" }).click();
    await page.getByRole("option", { name: "No" }).click();

    // 5. Click "Save" button
    await page.getByRole("button", { name: "Save" }).click();

    // Navigate back to view list to verify changes
    await page.getByRole("link", { name: "View List" }).click();

    // Verify updated list name displays correctly
    await expect(page.getByRole("heading", { name: "Updated Movie Collection", level: 1 })).toBeVisible();

    // Verify updated description displays correctly
    await expect(page.getByRole("heading", { name: "Updated description for test movies", level: 2 })).toBeVisible();
  });
});