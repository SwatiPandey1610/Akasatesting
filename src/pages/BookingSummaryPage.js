import { test } from "@playwright/test";

export class BookingSummaryPage {
  constructor(page) {
    this.page = page;
  }

  async validateBookingSummaryPage({ pageHeading, passengerName }) {
    await test.step(`should show the heading: ${pageHeading}`, async () => {
      await this.page.getByText(pageHeading);
    });

    await test.step(`should show passenger name: ${passengerName}`, async () => {
      await this.page.getByText(passengerName);
    });
  }

  async makePayment({ buttonText }) {
    await test.step(`should make the payment successfully`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
      await this.page.waitForLoadState("domcontentloaded");
      await this.page
        .frameLocator("iframe >> nth=3")
        .getByRole("listitem")
        .filter({ hasText: "Netbanking All Indian banks" })
        .click({ timeout: 15000 });
      await this.page
        .frameLocator("iframe >> nth=3")
        .locator("label")
        .filter({ hasText: "SBI" })
        .click({ timeout: 15000 });

      const page1Promise = this.page.waitForEvent("popup");
      await this.page
        .frameLocator("iframe >> nth=3")
        .getByRole("button", { name: "Pay Now" })
        .click();

      const page1 = await page1Promise;
      await page1.getByRole("button", { name: "Success" }).click();
      await this.page
        .locator("div")
        .filter({ hasText: /^My bookings$/ })
        .nth(1)
        .click({ timeout: 15000 });
    });
  }
}
