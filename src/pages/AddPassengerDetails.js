import { test } from "@playwright/test";

export class AddPassengerDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async enterUserName({
    firstName,
    lastName,
    gender,
    firstNameLabel,
    lastNameLabel,
    genderLabel,
  }) {
    await test.step(`I should be able to enter the user's first name: ${firstName}, last name: ${lastName}, and gender: ${gender}`, async () => {
      await this.page.getByLabel(firstNameLabel).click();
      await this.page.getByLabel(firstNameLabel).fill(firstName);

      await this.page.getByLabel(lastNameLabel).click();
      await this.page.getByLabel(lastNameLabel).fill(lastName);

      await this.page.getByRole("button", { name: genderLabel }).click();
      await this.page
        .getByRole("option", { name: gender, exact: true })
        .click();
    });
  }

  async enterUserEmail({ email, label }) {
    await test.step(`I should be able to enter the email: ${email}`, async () => {
      await this.page.getByLabel(label).click();
      await this.page.getByLabel(label).fill(email);
    });
  }

  async enterUserPhoneNumber({ phoneNumber, label }) {
    await test.step(`I should be able to enter the phone number: ${phoneNumber}`, async () => {
      await this.page.getByPlaceholder(label).click();
      await this.page.getByPlaceholder(label).type(phoneNumber);
      await this.page.getByPlaceholder(label).press("Tab");
    });
  }

  async continueToTheNextPage({ buttonText }) {
    await test.step(`I should be able to click on the continue button`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
      await this.page.waitForLoadState();
    });
  }
}
