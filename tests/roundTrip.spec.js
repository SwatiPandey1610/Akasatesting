import { test } from "@playwright/test";
import { POManager } from "@/pages/POManager";
import testData from "../fixtures/testData.json";

test("Round trip onepax saver seatSelection", async ({ page }) => {

  // login to page and accept cookies
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.acceptCookies();

  // Home page
  const homePage = poManager.getHomePage();
  await homePage.validatePanelName({ panelName: testData.bookFlight });
  await homePage.selectRoundTrip({ tripType: testData.roundTrip });
  await homePage.enterBoarding({
    originLabel: testData.from,
    originCity: testData.originCity,
  });
  await homePage.searchFlightButtonDisabled({
    buttonText: testData.searchFlights,
  });
  await homePage.enterDestination({
    destinationLabel: testData.to,
    destinationCity: testData.destinationCity,
  });
  await homePage.returnDate({
    dateLabel: testData.chooseDate,
    journeyType: /^Departure date$/,
    journeyDate: 1,
  });
  await homePage.returnDate({
    dateLabel: testData.chooseDate,
    journeyType: /^Return Date$/,
    journeyDate: 2,
  });
  await homePage.searchFlightButtonEnabled({
    buttonText: testData.searchFlights,
  });
  await homePage.shouldSearchFlight({
    buttonText: testData.searchFlights,
  });

  // flight search page
  const flightSearchPage = poManager.getFlightSearchPage();
  await flightSearchPage.selectRoundFlightWithLowestFare({
    buttonLocator: ".listofFlights_lowfare_box__tYqZ1",
  });
  await flightSearchPage.continueToTheNextPage({
    buttonText: testData.continue,
  });
  await flightSearchPage.selectSaver({ buttonText: testData.noThanks });

  // passenger booking details page
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
  await seatSelectPage.selectFreeSeat();
  await seatSelectPage.selectReturnTripSeat({ buttonText: `${testData.destinationCity} - ${testData.originCity}` });
  await seatSelectPage.selectFreeSeat();
  await seatSelectPage.navigateToBokkingSummaryPage({
    buttonText: testData.confirmSeats,
  });

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

});

test('Round trip one pax flexi', async ({ page }) => {
  // login to page and accept cookies
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.acceptCookies();
  // Home page
  const homePage = poManager.getHomePage();
  await homePage.validatePanelName({ panelName: testData.bookFlight });
  await homePage.selectRoundTrip({ tripType: testData.roundTrip });
  await homePage.enterBoarding({
    originLabel: testData.from,
    originCity: testData.originCity,
  });
  await homePage.searchFlightButtonDisabled({
    buttonText: testData.searchFlights,
  });
  await homePage.enterDestination({
    destinationLabel: testData.to,
    destinationCity: testData.destinationCity,
  });
  await homePage.returnDate({
    dateLabel: testData.chooseDate,
    journeyType: /^Departure date$/,
    journeyDate: 1,
  });
  await homePage.returnDate({
    dateLabel: testData.chooseDate,
    journeyType: /^Return Date$/,
    journeyDate: 2,
  });
  await homePage.searchFlightButtonEnabled({
    buttonText: testData.searchFlights,
  });
  await homePage.shouldSearchFlight({
    buttonText: testData.searchFlights,
  });

  // flight search page

  const flightSearchPage = poManager.getFlightSearchPage();
  await flightSearchPage.selectRoundFlightWithLowestFare({
    buttonLocator: ".listofFlights_lowfare_box__tYqZ1",
  });
  await flightSearchPage.continueToTheNextPage({
    buttonText: testData.continue,
  });
  await flightSearchPage.selectSaver({ buttonText: testData.flexi });

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
  await selectAddOnsPage.skipComplimentaryMeal({ buttonText: "Select your complimentary meal" })
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

})

test('Round trip one senior citizen and one infant', async ({ page }) => {

  // login to page and accept cookies
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.acceptCookies();

  // Home page
  const homePage = poManager.getHomePage();
  await homePage.validatePanelName({ panelName: testData.bookFlight });
  await homePage.selectRoundTrip({ tripType: testData.roundTrip });
  await homePage.enterBoarding({
    originLabel: testData.from,
    originCity: testData.originCity,
  });
  await homePage.searchFlightButtonDisabled({
    buttonText: testData.searchFlights,
  });
  await homePage.enterDestination({
    destinationLabel: testData.to,
    destinationCity: testData.destinationCity,
  });
  await homePage.returnDate({
    dateLabel: testData.chooseDate,
    journeyType: /^Departure date$/,
    journeyDate: 1,
  });
  await homePage.returnDate({
    dateLabel: testData.chooseDate,
    journeyType: /^Return Date$/,
    journeyDate: 2,
  });
  await homePage.selectSeniorCitizenAndInfant();
  await homePage.searchFlightButtonEnabled({
    buttonText: testData.searchFlights,
  });
  await homePage.shouldSearchFlight({
    buttonText: testData.searchFlights,
  });

  // flight search page
  const flightSearchPage = poManager.getFlightSearchPage();
  await flightSearchPage.selectRoundFlightWithLowestFare({
    buttonLocator: ".listofFlights_lowfare_box__tYqZ1",
  });
  await flightSearchPage.continueToTheNextPage({
    buttonText: testData.continue,
  });
  await flightSearchPage.selectSaver({ buttonText: testData.noThanks });

  // Booking passenger details 
  const addPassengerDetailsPage = poManager.getAddPassengerDetailsPage();
  const paxName = testData.paxName[0];
  await addPassengerDetailsPage.enterSeniorCitizenDetails({
    firstName: paxName.firstName,
    lastName: paxName.lastName,
    gender: paxName.gender,
    firstNameLabel: testData.firstName,
    lastNameLabel: testData.lastName,
    genderLabel: testData.gender,
    InputLocator: ".MuiAccordionDetails-root",
  });
  await addPassengerDetailsPage.enterInfantDetails({
    firstName: testData.secondPaxFname,
    lastName: testData.secondPaxLastName,
    gender: paxName.gender,
    firstNameLabel: testData.firstName,
    lastNameLabel: testData.lastName,
    genderLabel: testData.gender,
    InputLocator:
      "div:nth-child(4) > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > #panel2a-content > .MuiAccordionDetails-root",
  });
  const paxContactDetails = testData.passengerContactDetails;
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
})

test('Round trip two adults saver', async ({ page }) => {
  // login to page and accept cookies
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.acceptCookies();
  // Home page
  const homePage = poManager.getHomePage();
  await homePage.validatePanelName({ panelName: testData.bookFlight });
  await homePage.selectRoundTrip({ tripType: testData.roundTrip });
  await homePage.enterBoarding({
    originLabel: testData.from,
    originCity: testData.originCity,
  });
  await homePage.searchFlightButtonDisabled({
    buttonText: testData.searchFlights,
  });
  await homePage.enterDestination({
    destinationLabel: testData.to,
    destinationCity: testData.destinationCity,
  });
  await homePage.returnDate({
    dateLabel: testData.chooseDate,
    journeyType: /^Departure date$/,
    journeyDate: 1,
  });
  await homePage.returnDate({
    dateLabel: testData.chooseDate,
    journeyType: /^Return Date$/,
    journeyDate: 2,
  });
  await homePage.selectTwoAdults({ filterText: "Adult(s)Age above 121" });
  await homePage.searchFlightButtonEnabled({
    buttonText: testData.searchFlights,
  });
  await homePage.shouldSearchFlight({
    buttonText: testData.searchFlights,
  });

  // flight search page

  const flightSearchPage = poManager.getFlightSearchPage();
  await flightSearchPage.selectOngoingFlight({
    buttonLocator: ".listofFlights_lowfare_box__tYqZ1",
  });
  await flightSearchPage.selectReturnFlight({
    buttonLocator: ".listofFlights_lowfare_box__tYqZ1",
  });
  await flightSearchPage.continueToTheNextPage({
    buttonText: testData.continue,
  });
  await flightSearchPage.selectSaver({ buttonText: testData.noThanks });

  // Add pax details page
  const addPassengerDetailsPage = poManager.getAddPassengerDetailsPage();
  const paxName = testData.paxName[0];
  const paxContactDetails = testData.passengerContactDetails;
  await addPassengerDetailsPage.enterMultiplePaxDetails({
    firstName: paxName.firstName,
    lastName: paxName.lastName,
    gender: paxName.gender,
    firstNameLabel: testData.firstName,
    lastNameLabel: testData.lastName,
    genderLabel: testData.gender,
    secondPaxFname: testData.secondPaxFname,
    secondPaxLastName: testData.secondPaxLastName
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


})
