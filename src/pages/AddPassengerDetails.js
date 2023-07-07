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


  async enterSeniorCitizenDetails({ firstName,
    lastName,
    gender,
    firstNameLabel,
    lastNameLabel,
    genderLabel,
    InputLocator
  }) {
    const paxInputLocator = this.page
      .locator(InputLocator)
      .first();
    await paxInputLocator.getByLabel(firstNameLabel).click();
    await paxInputLocator.getByLabel(firstNameLabel).fill(firstName);
    await paxInputLocator.getByLabel(lastNameLabel).click();
    await paxInputLocator.getByLabel(lastNameLabel).fill(lastName);
    await paxInputLocator
      .getByRole("button", { name: genderLabel })
      .click();
    await this.page
      .getByRole("option", { name: gender, exact: true })
      .click();
    await this.page.getByRole('button', { name: 'Choose date' }).first().click();
    await this.page.getByRole('button', { name: 'calendar view is open, switch to year view' }).click();
    await this.page.getByRole('button', { name: '1963' }).click();
  }


  async enterInfantDetails({ firstName,
    lastName,
    gender,
    firstNameLabel,
    lastNameLabel,
    genderLabel,
    InputLocator
  }) {
    const paxInputLocator = this.page
      .locator(InputLocator)
      .first();
    await paxInputLocator.getByLabel(firstNameLabel).click();
    await paxInputLocator.getByLabel(firstNameLabel).fill(firstName);
    await paxInputLocator.getByLabel(lastNameLabel).click();
    await paxInputLocator.getByLabel(lastNameLabel).fill(lastName);
    await paxInputLocator
      .getByRole("button", { name: genderLabel })
      .click();
    await this.page
      .getByRole("option", { name: gender, exact: true })
      .click();
    await this.page.getByRole('button', { name: 'Choose date' }).nth(1).click();
    await this.page.getByRole('button', { name: 'calendar view is open, switch to year view' }).click();
    await this.page.getByRole('button', { name: '2021' }).click();
    await this.page.getByRole('gridcell', { name: '30' }).click();
  }

  async enterMultiplePaxDetails({
    firstName,
    lastName,
    gender,
    firstNameLabel,
    lastNameLabel,
    genderLabel,
    secondPaxFname,
    secondPaxLastName
  }) {
    await test.step("i should be able to add First passenger", async () => {
      const firstInputLocator = this.page
        .locator(".MuiAccordionDetails-root")
        .first();
      await firstInputLocator.getByLabel(firstNameLabel).click();
      await firstInputLocator.getByLabel(firstNameLabel).fill(firstName);
      await firstInputLocator.getByLabel(lastNameLabel).click();
      await firstInputLocator.getByLabel(lastNameLabel).fill(lastName);
      await firstInputLocator
        .getByRole("button", { name: genderLabel })
        .click();
      await this.page
        .getByRole("option", { name: gender, exact: true })
        .click();
    });
    await test.step("i should be able to add Second passenger", async () => {
      const secondInputLocator = this.page.locator(
        "div:nth-child(4) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2a-content > .MuiAccordionDetails-root",
      );
      await secondInputLocator.getByLabel(firstNameLabel).click();
      await secondInputLocator.getByLabel(firstNameLabel).fill(secondPaxFname);
      await secondInputLocator.getByLabel(lastNameLabel).click();
      await secondInputLocator.getByLabel(lastNameLabel).fill(secondPaxLastName);
      await secondInputLocator;
      await this.page
        .getByRole("button", { name: "Select gender ​" })
        .nth(1)
        .click();
      await this.page
        .getByRole("option", { name: "Male", exact: true })
        .click();
    });
  }
}
