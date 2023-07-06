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
}
