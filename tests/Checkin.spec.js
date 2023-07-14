import test from "@playwright/test";
import testData from "../fixtures/testData.json";
import { POManager } from "../src/pages/POManager";
import CheckInTestData from "../fixtures/CheckInTestData.json"

test.describe("Check-in one way within 48 hours", () => {
    test("Enter Passenger Details and submit", async ({ page }) => {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await page.pause()
        await loginPage.acceptCookies();

        const homePage = poManager.getHomePage();
        await homePage.validatePanelName({ panelName: testData.checkIn });


        //Check In Panel

        const CheckIn = poManager.getCheckinPanel()
        //await CheckIn.SelectCheckInPanel()
        // await CheckIn.checkInPanel()
        await CheckIn.EnterPNR({ PassengerPNRTextbox: CheckInTestData.PNR })
        //await CheckIn.EnterLastnameOrEmail({ PassengerLastNameOrEmailTextbox: CheckInTestData.Email })
        //await CheckIn.ClickSubmitButton()

    })
});
