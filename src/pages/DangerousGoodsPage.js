import { test } from "@playwright/test";

export class DangerousGoodsPage {
  constructor(page) {
    this.page = page;
  }

  async validateDangerousGoodsPage({ dangerousGoodsText }) {
    await test.step(`validates the dangerous text`, async () => {
      await this.page.getByText(dangerousGoodsText);
    });
  }

  async acceptDangerousGoodsPolicy({ label }) {
    await test.step(`agrees to the dangerous goods policy`, async () => {
      await this.page.getByLabel(label).check();
    });
  }

  async proceedToCheckIn({ buttonText }) {
    await test.step(`should take the user to the check-in successful page`, async () => {
      await this.page.getByRole("button", { name: buttonText }).click();
    });
  }
}
