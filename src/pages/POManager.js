import { AddOnsPage } from "./AddOnsPage";
import { AddPassengerDetailsPage } from "./AddPassengerDetails";
import { BookingSuccessPage } from "./BookingSuccessPage";
import { BookingSummaryPage } from "./BookingSummaryPage";
import { CheckInAddOnsPage } from "./CheckInAddOnsPage";
import { CheckInSeatSelectPage } from "./CheckInSeatSelectPage";
import { CheckInSuccessfulPage } from "./CheckInSuccessfulPage";
import { CheckInSummaryPage } from "./CheckInSummaryPage";
import { DangerousGoodsPage } from "./DangerousGoodsPage";
import { FlightSearchPage } from "./FlightSearchPage";
import { HealthDeclarationPage } from "./HealthDeclarationPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { RetrieveBookingPage } from "./RetrieveBookingPage";
import { SeatSelectPage } from "./SeatSelectPage";

export class POManager {
  constructor(page) {
    this.page = page;
  }

  getLoginPage = () => new LoginPage(this.page);

  getHomePage = () => new HomePage(this.page);

  getFlightSearchPage = () => new FlightSearchPage(this.page);

  getAddPassengerDetailsPage = () => new AddPassengerDetailsPage(this.page);

  getAddOnsPage = () => new AddOnsPage(this.page);

  getSeatSelectPage = () => new SeatSelectPage(this.page);

  getBookingSummaryPage = () => new BookingSummaryPage(this.page);

  getBookingSuccessPage = () => new BookingSuccessPage(this.page);

  getRetrieveBookingPage = () => new RetrieveBookingPage(this.page);

  getCheckInSummaryPage = () => new CheckInSummaryPage(this.page);

  getCheckInAddOnsPage = () => new CheckInAddOnsPage(this.page);

  getCheckInSeatSelectPage = () => new CheckInSeatSelectPage(this.page);

  getHealthDeclarationPage = () => new HealthDeclarationPage(this.page);

  getDangerousGoodsPage = () => new DangerousGoodsPage(this.page);

  getCheckInSuccessfulPage = () => new CheckInSuccessfulPage(this.page);
}
