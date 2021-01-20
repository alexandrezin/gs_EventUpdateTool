//---------------------------------------------------------------------------------------------------//
//                                    AVI-SPL Event Tracker Script                                   //
//---------------------------------------------- v1.0 -----------------------------------------------//
//                                       alexandrez@google.com                                       //
//---------------------------------------------------------------------------------------------------//

//Global Constants
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

//Global Functions
function install() {
  SpreadsheetApp.getActiveSpreadsheet();
}

function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Event Menu")
    .addItem("Event Summary", "openEventSummary")
    .addToUi();
}