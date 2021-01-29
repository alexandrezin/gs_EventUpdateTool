function insertOnDatabase(submittedEvent, siteLocation){
 
 //Lock the function to avoid problems with multiple submissions at the same time
 var lock = LockService.getScriptLock(); //Lock
 lock.waitLock(20000);                   //For 20 sec.
 
 //Open the center spreadsheet
 var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetLink);
 var sheet = spreadsheet.getSheetByName(siteLocation);
 
 //Get the first null cell
 var row = getFirstNullCell(sheet);
 
 //Fill the event information
 sheet.getRange(row, eventIdColumn).setValue("=HYPERLINK(\"https://gutsv3.corp.google.com/#ticket/" + submittedEvent.getId() +"\"," + submittedEvent.getId() + ")");
 sheet.getRange(row, eventRequestDateColumn).setValue(submittedEvent.getRequestDate());
 sheet.getRange(row, eventRequesterColumn).setValue(submittedEvent.getRequester());
 sheet.getRange(row, eventTypeColumn).setValue(submittedEvent.getType());
 sheet.getRange(row, eventNameColumn).setValue(submittedEvent.getName());
 sheet.getRange(row, eventDateColumn).setValue(submittedEvent.getDate());
 sheet.getRange(row, eventSetupTimeColumn).setValue(submittedEvent.getSetupTime());
 sheet.getRange(row, eventStartTimeColumn).setValue(submittedEvent.getStartTime());
 sheet.getRange(row, eventEndTimeColumn).setValue(submittedEvent.getEndTime());
 //Set the event status to scheduled
 sheet.getRange(row, eventStatusColumn).setValue("Scheduled");
 //Write the "Notified in Advance" formula - =IF(DATEDIF(B3,F3,"D") > 7,"Yes", "No")
 sheet.getRange(row, eventNotifiedInAdvanceColumn).setValue("=IF(DATEDIF(B" + row + ",F" + row + ",\"D\") > 7,\"Yes\", \"No\")");
 //Write the event notes and set a border
 sheet.getRange(row, eventTechNotesColumn).setValue(submittedEvent.getTechNotes()).setBorder(false,false,false,true,false,false,"Black",SpreadsheetApp.BorderStyle.SOLID);
 
 //Release the function lock
 lock.releaseLock();
}
 
function getFirstNullCell(sheet){
 var row = 1;
 while (!sheet.getRange(row, eventIdColumn).isBlank()){
   row ++;
 }
 return row;
}