import test from "@playwright/test";
import testData from "../fixtures/testData.json";
import { POManager } from "../src/pages/POManager";

test.describe("One way - one pax", () => {
  test("New booking and check-in", async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.acceptCookies();

    // Home page
    const homePage = poManager.getHomePage();
    await homePage.validatePanelName({ panelName: testData.bookFlight });
    await homePage.selectTrip({ tripType: testData.tripType });
    await homePage.enterBoarding({
      originLabel: testData.from,
      originCity: testData.originCity,
    });
    await homePage.enterDestination({
      destinationLabel: testData.to,
      destinationCity: testData.destinationCity,
    });
    await homePage.pickDate({ dateLabel: testData.chooseDate });
    await homePage.searchFlightButtonEnabled({
      buttonText: testData.searchFlights,
    });
    await homePage.shouldSearchFlight({
      buttonText: testData.searchFlights,
    });

    // Flight search page
    const flightSearchPage = poManager.getFlightSearchPage();
    await flightSearchPage.selectFlightWithLowestFare({
      buttonText: testData.select,
    });
    await flightSearchPage.continueToTheNextPage({
      buttonText: testData.continue,
    });
    await flightSearchPage.selectSaver({ buttonText: testData.noThanks });

    // Add pax details page
    const addPassengerDetailsPage = poManager.getAddPassengerDetailsPage();
    const paxName = testData.paxName[0];
    const paxContactDetails = testData.passengerContactDetails;
    await addPassengerDetailsPage.enterUserName({
      firstName: paxName.firstName,
      lastName: paxName.lastName,
      gender: paxName.gender,
      firstNameLabel: testData.firstName,
      lastNameLabel: testData.lastName,
      genderLabel: testData.gender,
    });
    await addPassengerDetailsPage.enterUserPhoneNumber({
      phoneNumber: paxContactDetails.phoneNumber,
      label: testData.phoneNumberPlaceholder,
    });
    await addPassengerDetailsPage.enterUserEmail({
      email: paxContactDetails.email,
      label: testData.emailId,
    });
    await flightSearchPage.continueToTheNextPage({
      buttonText: testData.continue,
    });

    // Booking add-ons page
    const selectAddOnsPage = poManager.getAddOnsPage();
    await selectAddOnsPage.skipAddOnSelection({ buttonText: testData.skip });

    // Booking seat select page
    const seatSelectPage = poManager.getSeatSelectPage();
    await seatSelectPage.skipSeatSelection({ buttonText: testData.skip });

    // Booking summary page
    const bookingSummaryPage = poManager.getBookingSummaryPage();
    await bookingSummaryPage.validateBookingSummaryPage({
      passengerName: `${paxName.firstName} ${paxName.lastName}`,
      pageHeading: testData.whosTravelling,
    });
    await bookingSummaryPage.makePayment({ buttonText: testData.makePayment });

    // Booking success page
    const bookingSuccessPage = poManager.getBookingSuccessPage();
    await bookingSuccessPage.validateBookingSuccessMessage({
      bookingSuccessText: testData.bookingSuccessMessage,
    });
    await bookingSuccessPage.navigateToManageBooking({
      manageBookingText: testData.manageBooking,
    });

    // Retrieve booking page
    const retrieveBookingPage = poManager.getRetrieveBookingPage();
    await retrieveBookingPage.validateRetrieveBookingPage({
      modifyBookingText: testData.modifyBooking,
    });
    await retrieveBookingPage.navigateToCheckIn({
      buttonText: testData.checkIn,
    });

    // Check-in summary page
    const checkInSummaryPage = poManager.getCheckInSummaryPage();
    await checkInSummaryPage.validateCheckInSummaryPage({
      checkInSummaryText: testData.checkInSummary,
    });
    await checkInSummaryPage.selectPassenger();
    await checkInSummaryPage.navigateToCheckInAddonsPage({
      buttonText: testData.selectAddons,
    });

    // Check-in add-ons page
    const checkInAddOnsPage = poManager.getCheckInAddOnsPage();
    await checkInAddOnsPage.validateCheckInAddOnsPage({
      checkInAddOnsText: testData.checkInAddOnsText,
    });
    await checkInAddOnsPage.navigateToSeatSelect({
      buttonText: testData.selectYourSeat,
    });

    // Check-in seat select page
    const checkInSeatSelectPage = poManager.getCheckInSeatSelectPage();
    await checkInSeatSelectPage.validateCheckInSeatSelectPage({
      checkInSeatSelectText: testData.checkInSeatSelect,
    });
    await checkInSeatSelectPage.selectFreeSeat();
    await checkInSeatSelectPage.navigateToHealthDeclaration({
      buttonText: testData.confirmSeats,
    });

    // Check-in seat select page
    const healthDeclarationPage = poManager.getHealthDeclarationPage();
    await healthDeclarationPage.validateHealthDeclarationPage({
      healthDeclarationText: testData.healthDeclaration,
    });
    await healthDeclarationPage.fillHealthDeclarationForm({
      phoneNumberLabel: testData.phoneNumber,
      emailLabel: testData.emailId,
      ageLabel: testData.age,
      pinCodeLabel: testData.pinCode,
      addressLabel: testData.destinationAddress,
      phoneNumber: paxContactDetails.shortPhoneNumber,
      email: paxContactDetails.email,
      age: paxContactDetails.age,
      address: paxContactDetails.address,
      pinCode: paxContactDetails.pinCode,
    });
    await healthDeclarationPage.navigateToDangerousGoods({
      buttonText: testData.continue,
    });

    // Dangerous goods page
    const dangerousGoodsPage = poManager.getDangerousGoodsPage();
    await dangerousGoodsPage.validateDangerousGoodsPage({
      dangerousGoodsText: testData.dangerousGoods,
    });
    await dangerousGoodsPage.acceptDangerousGoodsPolicy({
      label: testData.iAgree,
    });
    await dangerousGoodsPage.proceedToCheckIn({
      buttonText: testData.continue,
    });

    // Check-in success page
    const checkInSuccessfulPage = poManager.getCheckInSuccessfulPage();
    await checkInSuccessfulPage.validateCheckInSuccessfulPage({
      checkInSuccessText: testData.checkInSuccess,
    });
  });
});
