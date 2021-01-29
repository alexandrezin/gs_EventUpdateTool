var selectedEvent = new Event();
var errorMessage;

function openEventSummary(){
  Logger.log("Opening Event Sumary");

  var sheet = SpreadsheetApp.getActiveSheet();
  var selectedRow = sheet.getCurrentCell().getRow();

  selectedEvent = getEventInformation(sheet, selectedRow);

  Logger.log("Selected Event: " + selectedEvent.getId());

  showWebPage("EventSummaryPage", "Event Summary", "700", "800");

  Logger.log("Event Summary Successfully Opened");
}

function processForm(formObject){
  Logger.log("Updating Event");

  var updatedEvent = new Event(formObject.eventId,formObject.eventRequestDate, formObject.eventRequester, formObject.eventType, formObject.eventName, formObject.eventDate, formObject.eventSetupTime, formObject.eventStartTime, formObject.eventEndTime, formObject.eventStatus, formObject.eventNotifiedInAdvance, formObject.eventTechNotes, formObject.eventActualSetupTime, formObject.eventActualStartTime, formObject.eventActualEndTime, formObject.eventIncidents, formObject.eventObservations);

  Logger.log(updatedEvent.toString());

  try{
    var sheet = SpreadsheetApp.getActiveSheet();
    eventRow = getEventRow(sheet, updatedEvent.getId());

    sheet.getRange(eventRow, eventTypeColumn).setValue(updatedEvent.getType());
    sheet.getRange(eventRow, eventNameColumn).setValue(updatedEvent.getName());
    sheet.getRange(eventRow, eventDateColumn).setValue(updatedEvent.getDate());
    sheet.getRange(eventRow, eventSetupTimeColumn).setValue(updatedEvent.getSetupTime());
    sheet.getRange(eventRow, eventStartTimeColumn).setValue(updatedEvent.getStartTime());
    sheet.getRange(eventRow, eventEndTimeColumn).setValue(updatedEvent.getEndTime());
    sheet.getRange(eventRow, eventStatusColumn).setValue(updatedEvent.getStatus());
    sheet.getRange(eventRow, eventTechNotesColumn).setValue(updatedEvent.getTechNotes()).setBorder(false,false,false,true,false,false,"Black",SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(eventRow, eventActualSetupTimeColumn).setValue(updatedEvent.getActualSetupTime());
    sheet.getRange(eventRow, eventActualStartTimeColumn).setValue(updatedEvent.getActualStartTime());
    sheet.getRange(eventRow, eventActualEndTimeColumn).setValue(updatedEvent.getActualEndTime());
    sheet.getRange(eventRow, eventIncidentsColumn).setValue(updatedEvent.getIncidents());
    sheet.getRange(eventRow, eventObservationsColumn).setValue(updatedEvent.getObservations());
    
    Logger.log("Event Successfully Updated");

    selectedEvent = getEventInformation(sheet, eventRow);

    showWebPage("EventSummaryPage", "Event Updated", "700", "800");
    
    Logger.log("Event Summary Successfully Refreshed");
  }

  catch(e){
    errorMessage = e;
    showWebPage("ErrorPage", "Failed to Update the Event!");
  }
}

function getEventRow(sheet, eventId){

  var lastSpreadsheetRow = sheet.getRange("A:A").getLastRow();
  var row = null;

  //Get the event row
  for (x = 3; x <= lastSpreadsheetRow; x++){
    if(sheet.getRange(x,1).getValue().toString() == eventId){
      row = x;
      x = lastSpreadsheetRow;
    }
  }

  return row;
}

function getEventInformation(sheet, row){
  var event = new Event();

  Logger.log("Getting event information");

  var values = sheet.getRange("A" + row + ":Q" + row).getValues();

  event.setId(values[0][eventIdColumn - 1]);
  event.setRequestDate(values[0][eventRequestDateColumn - 1]);
  event.setRequester(values[0][eventRequesterColumn - 1]);
  event.setType(values[0][eventTypeColumn - 1]);
  event.setName(values[0][eventNameColumn - 1]);
  event.setDate(values[0][eventDateColumn - 1]);
  event.setSetupTime(values[0][eventSetupTimeColumn - 1]);
  event.setStartTime(values[0][eventStartTimeColumn - 1]);
  event.setEndTime(values[0][eventEndTimeColumn - 1]);
  event.setStatus(values[0][eventStatusColumn - 1]);
  event.setNotifiedInAdvance(values[0][eventNotifiedInAdvanceColumn - 1]);
  event.setTechNotes(values[0][eventTechNotesColumn - 1]);
  event.setActualSetupTime(values[0][eventActualSetupTimeColumn - 1]);
  event.setActualStartTime(values[0][eventActualStartTimeColumn - 1]);
  event.setActualEndTime(values[0][eventActualEndTimeColumn - 1]);
  event.setIncidents(values[0][eventIncidentsColumn - 1]);
  event.setObservations(values[0][eventObservationsColumn - 1]);

  return event;
}

//https://developers.google.com/apps-script/guides/html/templates#code.gs_1
function showWebPage(file, title, width, height) {
  var html = HtmlService.createTemplateFromFile(file).evaluate().setWidth(width).setHeight(height);
  SpreadsheetApp.getUi().showModalDialog(html, title);
}

function formatSpreadsheetTime(time){
  if (time != ""){
    return Utilities.formatDate(new Date(time),"GMT-0800", "HH:mm");
  }
  else return "";
}

function formatSpreadsheetDate(date){
  if (date != ""){
    return Utilities.formatDate(new Date(date),"GMT-0800", "yyyy-MM-dd");
  }
  else return "";
}