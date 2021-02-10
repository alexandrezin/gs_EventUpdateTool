//---------------------------------------------------------------------------------------------------//
//                                    AVI-SPL Event Tracker Script                                   //
//------------------------------------------- v1.0 - 2021 -------------------------------------------//
//              Alexandre Zin.   Michael Nishimura.   Guang Lai.   Marcelo Aranovich.                //
//---------------------------------------------------------------------------------------------------//

//Install GutsApi and Forms Permissions
function install() {
  FormApp.getActiveForm();
}

//Install Spreadsheet Permission
function installSpreadsheetPermissions() {
  SpreadsheetApp.getActiveSpreadsheet();
}

//Global Constants
const spreadsheetLink = "https://docs.google.com/spreadsheets/d/1ornnvbUnpBTXP8v0M9k9PIxMjOrF5Q5T-x4vVoKxZkk/edit";
//
const eventIdColumn = 1;
const eventRequestDateColumn = 2;
const eventRequesterColumn = 3;
const eventTypeColumn = 4;
const eventNameColumn = 5;
const eventDateColumn = 6;
const eventSetupTimeColumn = 7;
const eventStartTimeColumn = 8;
const eventEndTimeColumn = 9;
const eventStatusColumn = 10;
const eventNotifiedInAdvanceColumn = 11;
const eventTechNotesColumn = 12;
const eventActualSetupTimeColumn = 13;
const eventActualStartTimeColumn = 14;
const eventActualEndTimeColumn = 15;
const eventIncidentsColumn = 16;
const eventObservationsColumn = 17;

function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Event Menu")
    .addItem("Create Event", "openGoogleForms")
    .addItem("Update Event", "openEventSummary")
    .addSeparator()
    .addItem("Install Permissions", "installSpreadsheetPermissions")
    .addItem("Report a Bug", "openReportBug")
    .addToUi();
}

function onFormSubmit(e){
  Logger.log(e);

  //Values will be an array with values in the same order as they appear in the spreadsheet.
  var values = e.values;

  //Create a instance of Event
  var submittedEvent = new Event();

  //Getting Values
  submittedEvent.setRequestDate(values[0]);
  submittedEvent.setRequester(values[1].split('@')[0]);
  submittedEvent.setName(values[2]);
  submittedEvent.setType(values[3]);
  submittedEvent.setDate(values[4]);
  if (values[5] != "") submittedEvent.setSetupTime("Sat Dec 30 1899 GMT-0800 " + values[5]);
  if (values[6] != "") submittedEvent.setStartTime("Sat Dec 30 1899 GMT-0800 " + values[6]);
  if (values[7] != "") submittedEvent.setEndTime("Sat Dec 30 1899 GMT-0800 " + values[7]);
  submittedEvent.setTechNotes(values[8]);

  var submittedEventSiteLocation = values[9];

  //Create Guts Ticket
  submittedEvent.setId(createGutsTicket(submittedEvent, submittedEventSiteLocation));
  //Insert Event On Database
  insertOnDatabase(submittedEvent, submittedEventSiteLocation);
}