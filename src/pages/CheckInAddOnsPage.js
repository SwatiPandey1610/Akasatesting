import { test } from "@playwright/test";

export class CheckInAddOnsPage {
  constructor(page) {
    this.page = page;
  }

  async validateCheckInAddOnsPage({ checkInAddOnsText }) {
    await test.step(`validates the check-in add-ons text`, async () => {
      await this.page.getByText(checkInAddOnsText);
    });
  }

  async navigateToSeatSelect({ buttonText }) {
    await test.step(`should take the user to seat select page`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
    });
  }
}
