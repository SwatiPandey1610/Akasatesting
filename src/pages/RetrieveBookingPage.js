import { test } from "@playwright/test";

export class RetrieveBookingPage {
  constructor(page) {
    this.page = page;
  }

  async validateRetrieveBookingPage({ modifyBookingText }) {
    await test.step(`validates the modify booking text`, async () => {
      await this.page.getByText(modifyBookingText);
    });
  }

  async navigateToCheckIn({ buttonText }) {
    await test.step(`should redirect the user to the check-in page`, async () => {
      await this.page
        .getByRole("button", { name: buttonText, exact: true })
        .click();
    });
  }

  async checkInForRoundTrip({ buttonText }) {
    await test.step(`should select the check-in round trip`, async () => {
      await this.page.getByRole('checkbox', { name: 'Switch demo' }).check();
      await this.page.getByRole('button', { name: buttonText }).click();
    });
  }
}
