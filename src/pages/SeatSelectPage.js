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

  async selectFreeSeat() {
    await test.step(`should select a seat that has 0 fee`, async () => {
      await this.page.locator("div").filter({ hasText: /^₹0$/ }).nth(1).click();
    });
  }

  async navigateToBokkingSummaryPage({ buttonText }) {
    await test.step(`should take the user to the health declaration page`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
    });
  }
  
  async selectReturnTripSeat({ buttonText }) {
    await test.step(`should select a round trip  return seat`, async () => {
      await this.page.getByText(buttonText).click();
    });
  }

}
