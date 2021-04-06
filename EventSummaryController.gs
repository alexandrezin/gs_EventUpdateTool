var selectedEvent = new Event();
var errorMessage;

function openEventSummary(){
  Logger.log("Opening Event Sumary");

  //Open the spreadsheet and get the selected row
  var sheet = SpreadsheetApp.getActiveSheet();
  var selectedRow = sheet.getCurrentCell().getRow();
  //Get the event information of that row
  selectedEvent = getEventInformation(sheet, selectedRow);

  Logger.log("Selected Event: \n" + selectedEvent.toString());

  //Call the function to show the web page
  showWebPage("EventSummaryPage", "Event Summary", "700", "800");

  Logger.log("Event Summary Successfully Opened");
}

function processForm(formObject){
  Logger.log("Updating Event");

  //Open the spreadsheet and get the selected row
  var sheet = SpreadsheetApp.getActiveSheet();
  var selectedRow = sheet.getCurrentCell().getRow();
  //Get the event information of that row
  selectedEvent = getEventInformation(sheet, selectedRow);

  //Get the updated event information from the HTML form object received
  var updatedEvent = new Event(formObject.eventId,formObject.eventRequestDate, formObject.eventRequester, formObject.eventType, formObject.eventName, formObject.eventDate, formObject.eventSetupTime, formObject.eventStartTime, formObject.eventEndTime, formObject.eventStatus, formObject.eventNotifiedInAdvance, formObject.eventTechNotes, formObject.eventActualSetupTime, formObject.eventActualStartTime, formObject.eventActualEndTime, formObject.eventIncidents, formObject.eventObservations, formObject.eventAssignee);

  //Log both events
  Logger.log("Selected Event:\n" + selectedEvent.toString());
  Logger.log("Updated Event:\n" + updatedEvent.toString());

  try{
    //If the event has not been updated throw an exception
    if (selectedEvent.toString() == updatedEvent.toString()) throw new Error("No information to update");

    //Update the ticket
    var summary = "" + updatedEvent.getDate() + " " + sheet.getName() + " - " + updatedEvent.getType() + " - " + updatedEvent.getName() + " ";

    var status = "Pending";
    if (updatedEvent.getStatus() == "Done") status = "Resolved";
    else if (updatedEvent.getStatus() == "Cancelled") status = "Closed";
    else if (updatedEvent.getStatus() == "Pending Assignment") status = "Assigned";
    
    //Update the priority just if the event date has been changed  
    if (updatedEvent.getDate() != selectedEvent.getDate()){      
      
      var priority = getEventPriority(updatedEvent);
      
      var ticketJSON = {
        "ticket":{
          "core":{
              "assignee": updatedEvent.getAssignee(),
              "status":status,
              "priority":priority,
              "pendingWhat":"Pending Project",
              "summary":summary,
          },
          "cecRequest":{
              "eventDate": {"month":Utilities.formatDate(new Date(updatedEvent.getDate()),"-0800","MM"),
                            "year":Utilities.formatDate(new Date(updatedEvent.getDate()),"-0800","yyyy"),
                            "day":Utilities.formatDate(new Date(updatedEvent.getDate()),"-0800","dd")
                            },
          }
        }
      };
    }

    else{
      var ticketJSON = {
        "ticket":{
          "core":{
              "assignee": updatedEvent.getAssignee(),
              "status":status,
              "pendingWhat":"Pending Project",
              "summary":summary,
          },
          "cecRequest":{
              "eventDate": {"month":Utilities.formatDate(new Date(updatedEvent.getDate()),"-0800","MM"),
                            "year":Utilities.formatDate(new Date(updatedEvent.getDate()),"-0800","yyyy"),
                            "day":Utilities.formatDate(new Date(updatedEvent.getDate()),"-0800","dd")
                            },
          }
        }
      };
    }

    Guts.Tickets.update(ticketJSON,updatedEvent.getId());

    Logger.log("Guts Ticket Successfully Updated");

    //Get the event row
    eventRow = getEventRow(sheet, updatedEvent.getId());

    //Save the event data
    sheet.getRange(eventRow, eventTypeColumn).setValue(updatedEvent.getType());
    sheet.getRange(eventRow, eventNameColumn).setValue(updatedEvent.getName());
    sheet.getRange(eventRow, eventDateColumn).setValue(updatedEvent.getDate());
    sheet.getRange(eventRow, eventSetupTimeColumn).setValue(updatedEvent.getSetupTime());
    sheet.getRange(eventRow, eventStartTimeColumn).setValue(updatedEvent.getStartTime());
    sheet.getRange(eventRow, eventEndTimeColumn).setValue(updatedEvent.getEndTime());
    sheet.getRange(eventRow, eventStatusColumn).setValue(updatedEvent.getStatus());
    sheet.getRange(eventRow, eventAssigneeColumn).setValue(updatedEvent.getAssignee());
    sheet.getRange(eventRow, eventTechNotesColumn).setValue(updatedEvent.getTechNotes()).setBorder(false,false,false,true,false,false,"Black",SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(eventRow, eventActualSetupTimeColumn).setValue(updatedEvent.getActualSetupTime());
    sheet.getRange(eventRow, eventActualStartTimeColumn).setValue(updatedEvent.getActualStartTime());
    sheet.getRange(eventRow, eventActualEndTimeColumn).setValue(updatedEvent.getActualEndTime());
    sheet.getRange(eventRow, eventIncidentsColumn).setValue(updatedEvent.getIncidents());
    sheet.getRange(eventRow, eventObservationsColumn).setValue(updatedEvent.getObservations());
    
    Logger.log("Database Successfully Updated");
    
    //Re-Open the Event Summary Page
    selectedEvent = getEventInformation(sheet, eventRow);
    showWebPage("EventSummaryPage", "Event Updated", "700", "800");
    
    Logger.log("Event Summary Successfully Refreshed");
  }

  catch(e){
    //Show a Error Page
    errorMessage = e;
    showWebPage("ErrorPage", "Failed to Update the Event!", "700", "800");
    Logger.log("Event Update Failed: " + e);
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

  var values = sheet.getRange("A" + row + ":R" + row).getValues();

  event.setId(values[0][eventIdColumn - 1]);
  event.setRequestDate("" + values[0][eventRequestDateColumn - 1].toString().split(" ")[1] + " " + values[0][eventRequestDateColumn - 1].toString().split(" ")[2] + " " + values[0][eventRequestDateColumn - 1].toString().split(" ")[3] + " 00:00:00 GMT-0800");
  event.setRequester(values[0][eventRequesterColumn - 1]);
  event.setType(values[0][eventTypeColumn - 1]);
  event.setName(values[0][eventNameColumn - 1]);
  event.setDate("" + values[0][eventDateColumn - 1].toString().split(" ")[1] + " " + values[0][eventDateColumn - 1].toString().split(" ")[2] + " " + values[0][eventDateColumn - 1].toString().split(" ")[3] + " 00:00:00 GMT-0800");
  event.setSetupTime(values[0][eventSetupTimeColumn - 1]);
  event.setStartTime(values[0][eventStartTimeColumn - 1]);
  event.setEndTime(values[0][eventEndTimeColumn - 1]);
  event.setStatus(values[0][eventStatusColumn - 1]);
  event.setAssignee(values[0][eventAssigneeColumn - 1]);
  event.setNotifiedInAdvance(values[0][eventNotifiedInAdvanceColumn - 1]);
  event.setTechNotes(values[0][eventTechNotesColumn - 1]);
  event.setActualSetupTime(values[0][eventActualSetupTimeColumn - 1]);
  event.setActualStartTime(values[0][eventActualStartTimeColumn - 1]);
  event.setActualEndTime(values[0][eventActualEndTimeColumn - 1]);
  event.setIncidents(values[0][eventIncidentsColumn - 1]);
  event.setObservations(values[0][eventObservationsColumn - 1]);

  return event;
}

function getEventPriority(event){
  var eventDate = new Date(event.getDate()).getTime();
  var eventRequestDate = new Date(event.getRequestDate()).getTime();

  var daysNotifiedInAdvance = convertMillisecondsToDays(eventDate - eventRequestDate);

  if (daysNotifiedInAdvance < daysPriorEventLowPriority && daysNotifiedInAdvance > daysPriorEventMediumPriority){
    return "medium";
  }
  else if (daysNotifiedInAdvance <= daysPriorEventMediumPriority && daysNotifiedInAdvance >= 0){
    return "high";
  }
  else{
    return "low";
  }  
}

function convertMillisecondsToDays(milliseconds){
  //milliseconds / (Hours * Minutes * Seconds * Milliseconds)
  return Math.floor(milliseconds / (24 * 60 * 60 * 1000));
} 

//https://developers.google.com/apps-script/guides/html/templates#code.gs_1
function showWebPage(file, title, width, height) {
  var html = HtmlService.createTemplateFromFile(file).evaluate().setWidth(width).setHeight(height);
  SpreadsheetApp.getUi().showModalDialog(html, title);
}