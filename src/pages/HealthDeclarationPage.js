import { test } from "@playwright/test";

export class HealthDeclarationPage {
  constructor(page) {
    this.page = page;
  }

  async validateHealthDeclarationPage({ healthDeclarationText }) {
    await test.step(`validates the health declaration text`, async () => {
      await this.page.getByText(healthDeclarationText);
    });
  }

  async fillHealthDeclarationForm({
    phoneNumberLabel,
    emailLabel,
    ageLabel,
    pinCodeLabel,
    addressLabel,
    phoneNumber,
    email,
    age,
    address,
    pinCode,
  }) {
    await test.step(`fills the health declaration form`, async () => {
      await this.page.getByLabel(phoneNumberLabel).click();
      await this.page.getByLabel(phoneNumberLabel).fill(phoneNumber);
      await this.page.getByLabel(emailLabel).click();
      await this.page.getByLabel(emailLabel).fill(email);
      await this.page.getByLabel(ageLabel).click();
      await this.page.getByLabel(ageLabel).fill(age);
      await this.page.getByLabel(addressLabel).click();
      await this.page.getByLabel(addressLabel).fill(address);
      await this.page.getByLabel(pinCodeLabel).click();
      await this.page.getByLabel(pinCodeLabel).fill(pinCode);
      await this.page.getByRole("checkbox", { name: "Checkbox demo" }).check();
    });
  }

  async navigateToDangerousGoods({ buttonText }) {
    await test.step(`should take the user to dangerous goods page`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
    });
  }
}
