import { test } from "@playwright/test";

export class BookingSuccessPage {
  constructor(page) {
    this.page = page;
  }

  async validateBookingSuccessMessage({ bookingSuccessText }) {
    await test.step(`validates the booking success message`, async () => {
      await this.page.getByText(bookingSuccessText);
    });
  }

  async navigateToManageBooking({ manageBookingText }) {
    await test.step(`should click on the Manage Booking button`, async () => {
      await this.page
        .locator("div")
        .filter({ hasText: manageBookingText })
        .nth(1)
        .click();
    });
  }
}
