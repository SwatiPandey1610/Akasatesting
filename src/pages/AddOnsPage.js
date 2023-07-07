import { test } from "@playwright/test";

export class AddOnsPage {
  constructor(page) {
    this.page = page;
  }

  async skipAddOnSelection({ buttonText }) {
    await test.step(`I should be skip to the next page without adding any add-ons`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
      await this.page.waitForLoadState();
    });
  }

  async skipComplimentaryMeal({ buttonText }) {
    await test.step("Cancel Complimentary Meal", async () => {
      await this.page
        .getByRole("heading", { name: buttonText })
        .getByRole("img")
        .click();
    });
  }

  async selectComplimentaryMeal({ mealNumber }) {
    await test.step("Select Complimentary Meal", async () => {
      await this.page
        .locator(
          `div:nth-child(${mealNumber}) > .Meals_menuDetails___s_kr > .Meals_menuAction__ShXWc > .MuiButtonBase-root`,
        )
        .click();
    });
  }

  async confirmComplimentaryMeal({ buttonText }) {
    await test.step("Confirm Complimentary Meal", async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
    });
  }

}
