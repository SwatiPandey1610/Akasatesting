import { test } from "@playwright/test";
import config from "../../playwright.config";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.cookiesModal = page.locator(".cookieModal button");
  }

  async goTo() {
    await test.step(`Should open the browser and launch Akasa air`, async () => {
      const {
        use: { baseURL },
      } = config;
      await this.page.goto(baseURL);
    });
  }

  async acceptCookies() {
    await test.step(`Should accept the cookies`, async () => {
      await this.cookiesModal.click();
    });
  }
}
