import { expect, test } from "@playwright/test";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.selectOption = page.locator("[class*='Booking_popper'] li");
  }

  async validatePanelName({ panelName }) {
    await test.step(`I should be able to view and click on the search panels for ${panelName}`, async () => {
      await this.page.waitForLoadState();
      await this.page
        .locator("[class*='searchPanel_tab']")
        .getByRole("paragraph")
        .filter({ hasText: panelName })
        .click();
    });
  }

  async selectTrip({ tripType }) {
    await test.step(`I want to book a ${tripType} flight ticket`, async () => {
      await this.page.getByRole("radio", { name: tripType }).click();
      await expect(
        this.page.getByRole("radio", { name: tripType }),
      ).toBeChecked();
    });
  }

  async enterBoarding({ originLabel, originCity }) {
    await test.step(`I should be able to select the origin as ${originCity}`, async () => {
      await this.page.waitForLoadState("networkidle");
      await this.page.getByRole("textbox", { name: originLabel }).click();
      await this.page
        .getByRole("textbox", { name: originLabel })
        .fill(originCity);
      await this.selectOption.first().click();
    });
  }

  async enterDestination({ destinationLabel, destinationCity }) {
    await test.step(`I should be able to select the destination as ${destinationCity}`, async () => {
      await this.page.getByRole("textbox", { name: destinationLabel }).click();
      await this.page
        .getByRole("textbox", { name: destinationLabel })
        .fill(destinationCity);
      await this.selectOption.first().click();
    });
  }

  async pickDate({ dateLabel }) {
    await test.step(`I should be able to pick the departure date from the calendar`, async () => {
      await this.page.getByRole("button", { name: dateLabel }).click();
      await this.page
        .getByRole("gridcell", { name: new Date().getDate() + 1 })
        .click();
    });
  }

  async addPassengers({ inputLabel, paxType, paxCount, buttonText }) {
    await test.step(`I should be able to select ${paxCount} ${paxType}`, async () => {
      await this.page.getByRole("button", { name: inputLabel }).click();
      await this.page
        .locator("div")
        .filter({ hasText: paxType })
        .getByRole("button")
        .nth(1)
        .click();

      await this.page.getByRole("button", { name: buttonText }).click();
    });
  }

  async searchFlightButtonEnabled({ buttonText }) {
    await test.step(`the search button should be enabled`, async () => {
      await expect(
        this.page.getByRole("button", { name: buttonText }),
      ).toBeEnabled();
    });
  }

  async searchFlightButtonDisabled({ buttonText }) {
    await test.step(`the search button should be disabled`, async () => {
      await expect(
        this.page.getByRole("button", { name: buttonText }),
      ).toBeDisabled();
    });
  }

  async shouldSearchFlight({ buttonText }) {
    await test.step(`I should be able to search for the flight`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
    });
  }
}