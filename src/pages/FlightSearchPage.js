import { test, expect } from "@playwright/test";

export class FlightSearchPage {
  constructor(page) {
    this.page = page;
  }

  async validateLabels({ label }) {
    await test.step(`I should be a able to see the label ${label} in the flight search page`, async () => {
      await expect(this.page.getByText(label)).toBeVisible();
    });
  }

  async selectFlightWithLowestFare({ buttonText }) {
    await test.step("I should be a able to select the the first flight", async () => {
      await this.page.waitForLoadState();
      await this.page.waitForLoadState("networkidle");
      await this.page
        .getByRole("button", { name: "Lowest fare" })
        .getByRole("button", { name: buttonText })
        .click();
    });
  }

  async continueToTheNextPage({ buttonText }) {
    await test.step("I should be a able to click on the continue button", async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
    });
  }

  async selectSaver({ buttonText }) {
    await test.step("I should be a able to select the saver fare", async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
      await this.page.waitForLoadState();
    });
  }

  async validateNoFlightsScreen({ heading, description }) {
    await test.step("I should be able to see the No flights found screen", async () => {
      await expect(this.page.getByText(heading)).toBeVisible();
      await expect(this.page.getByText(description)).toBeVisible();
      await expect(
        this.page.getByRole("img", { name: "no-flights-icon" }),
      ).toBeVisible();
    });
  }

  async selectRoundFlightWithLowestFare({ buttonLocator }) {
    await test.step("I should be a able to select the the first flight", async () => {
      await this.page.waitForLoadState();
      const onGoingFlight = await this.page.locator(buttonLocator).nth(0)
      await onGoingFlight.click();
      const returnFlight = await this.page.locator(buttonLocator).nth(1);
      await returnFlight.click();
    });
  }

  async selectOngoingFlight({ buttonLocator }) {
    await test.step("I should be a able to select the ongoing flight with lowest fare", async () => {
      await this.page.waitForLoadState();
      const onGoingFlight = await this.page.locator(buttonLocator).nth(0)
      await onGoingFlight.click();

    });
  }

  async selectReturnFlight({ buttonLocator }) {
    await test.step("I should be a able to select the Return flight with lowest fare", async () => {
      await this.page.waitForLoadState();
      const onGoingFlight = await this.page.locator(buttonLocator).nth(1)
      await onGoingFlight.click();
    });
  }

}
