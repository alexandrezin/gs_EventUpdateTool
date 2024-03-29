//---------------------------------------------------------------------------------------------------//
//                                    AVI-SPL Event Tracker Script                                   //
//------------------------------------- 2021 August 1st Version -------------------------------------//
//              Alexandre Zin.   Michael Nishimura.   Guang Lai.   Marcelo Aranovich.                //
//---------------------------------------------------------------------------------------------------//

//Install GutsApi and Forms Permissions
function install() {
  FormApp.getActiveForm();
}

//Install Spreadsheet Permissions
function installSpreadsheetPermissions() {
  SpreadsheetApp.getActiveSpreadsheet();
}

//Global Constants
const spreadsheetLink = "https://docs.google.com/spreadsheets/d/1ornnvbUnpBTXP8v0M9k9PIxMjOrF5Q5T-x4vVoKxZkk/edit";
//
daysPriorEventLowPriority = 7;    //7 Days notice prior to the event --> Event Priority = LOW
daysPriorEventMediumPriority = 2; //2 or more days notice prior to the event --> Event Priority = MEDIUM
//                                //0 to 2 days notice prior to the event --> Event Priority = HIGH
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
const eventAssigneeColumn = 11;
const eventNotifiedInAdvanceColumn = 12;
const eventTechNotesColumn = 13;
const eventActualSetupTimeColumn = 14;
const eventActualStartTimeColumn = 15;
const eventActualEndTimeColumn = 16;
const eventRunByColumn = 17;
const eventIncidentsColumn = 18;
const eventObservationsColumn = 19;

function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Event Menu")
    .addItem("Create Event", "openGoogleForms")
    .addItem("Update Event", "openEventSummary")
    .addSeparator()
    .addItem("Install Permissions", "installSpreadsheetPermissions")
    .addItem("Report a Bug", "openReportBug")
    .addSeparator()
    .addItem("Help", "openHelpSite")
    .addItem("Changelog", "openChangelog") 
    .addToUi();
}

function onFormSubmit(e){
  //Values will be an array with values in the same order as they appear in the spreadsheet.
  var values = e.values;

  Logger.log("Received Event: " + values[3]);

  //Create a instance of Event
  var submittedEvent = new Event();

  //Getting Values
  submittedEvent.setRequestDate(values[0]);
  submittedEvent.setRequester(values[1].split('@')[0]);
  submittedEvent.setName(values[2]);
  submittedEvent.setType(values[3]);
  submittedEvent.setDate("" + values[4].toString().split("/")[0] + "/" + values[4].toString().split("/")[1] + "/" + values[4].toString().split("/")[2] + " 00:00:00 GMT-0800");
  if (values[5] != "") submittedEvent.setSetupTime("Sat Dec 30 1899 GMT-0800 " + values[5]);
  if (values[6] != "") submittedEvent.setStartTime("Sat Dec 30 1899 GMT-0800 " + values[6]);
  if (values[7] != "") submittedEvent.setEndTime("Sat Dec 30 1899 GMT-0800 " + values[7]);
  submittedEvent.setTechNotes(values[8]);

  var submittedEventSiteLocation = values[9];

  Logger.log("Created Event Class: " + submittedEvent.getName());

  for (var tries = 1; tries < 4; tries++){
    //Create Guts Ticket
    Logger.log("Creating Guts Ticket Attempt[" + tries + "/3]");
    submittedEvent.setId(createGutsTicket(submittedEvent, submittedEventSiteLocation));
    if (submittedEvent.getId() != 0) tries = 3;
  }

  Logger.log("Inserting event [" + submittedEvent.getId() + "] on database");
  
  //Insert Event On Database
  insertOnDatabase(submittedEvent, submittedEventSiteLocation);
}