import { test, expect } from "@playwright/test";

export class CheckInPanel {
    constructor(page) {
        this.page = page
        this.PNRTextbox = page.locator("//input[@id='name-input']")
        this.LastNameOrEmailTextbox = page.getByLabel('Email/Last Name')
        this.SubmitButton = page.getByRole('button', { name: 'Submit' })
        this.errorMessage = page.getByText('PNR/ Booking reference is required')

    }

    async EnterPNR({ PassengerPNRTextbox }) {
        test.step(`Enter Passenger PNR ${PassengerPNRTextbox}`, async () => {

            // await this.page.waitForLoadState();
            // await this.page.waitForEvent('close')
            //  const pnrElement = await this.page.waitForSelector('input[name="pnr"]');
            //  await this.page.waitForTimeout(500);
            // await pnrElement.click();
            // await pnrElement.fill(PassengerPNRTextbox);

            // await this.PNRTextbox.waitForElementState('visible');
            // await this.PNRTextbox.waitForElementState('enabled');
            //await this.PNRTextbox.scrollIntoViewIfNeeded();
            // await new Promise(resolve => setTimeout(resolve, 500));
            /*  await this.PNRTextbox.scrollIntoViewIfNeeded();
              await this.page.evaluate((element) => {
                  element.click();
              }, this.PNRTextbox);*/

            // await this.PNRTextbox.click()
            //await this.PNRTextbox.fill(PassengerPNRTextbox)
            await this.page.getByLabel('PNR/Booking Reference').click();
            await this.page.getByLabel('PNR/Booking Reference').fill(PassengerPNRTextbox);
        });
    }
    async EnterLastnameOrEmail({ PassengerLastNameOrEmailTextbox }) {
        test.step(`Enter Passenger Last Name or Email ${PassengerLastNameOrEmailTextbox} `, async () => {

            await this.page.waitForLoadState('networkidle');

            await this.LastNameOrEmailTextbox.click()
            await this.LastNameOrEmailTextbox.fill(PassengerLastNameOrEmailTextbox)
        });
    }
    async ClickSubmitButton() {
        test.step(`Click on Submit Button `, async () => {
            await this.SubmitButton.click()
        });
    }

}

