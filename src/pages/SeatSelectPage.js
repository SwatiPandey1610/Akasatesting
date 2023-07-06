import { test } from "@playwright/test";

export class SeatSelectPage {
  constructor(page) {
    this.page = page;
  }

  async skipSeatSelection({ buttonText }) {
    await test.step(`I should be skip to the next page without selecting a seat`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
      await this.page.waitForLoadState();
    });
  }
}
