function insertOnDatabase(submittedEvent, siteLocation){
 
 Logger.log("Waiting For Database Script Lock"); 
 //Lock the function to avoid problems with multiple submissions at the same time
 var lock = LockService.getScriptLock(); //Lock
 lock.waitLock(50000);                   //For 50 sec.
 Logger.log("Starting Database Service");

 Utilities.sleep(500);

 //Open the center spreadsheet
 var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetLink);
 var sheet = spreadsheet.getSheetByName(siteLocation);
 
 Logger.log("Spreadsheet Successfully Opened: " + sheet.getName());

 //Get the first null cell
 var row = getFirstNullCell(sheet);
 Logger.log("First Null Cell: " + row);

 Logger.log("Saving Event on database");  
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
 sheet.getRange(row, eventStatusColumn).setValue("Pending Assignment");
 //Write the "Notified in Advance" formula - =IF(F3>=B3,if(DATEDIF(B3,F3,"D") > 6,"Yes","No"),"N.A.")
 sheet.getRange(row, eventNotifiedInAdvanceColumn).setValue("=IF(F" + row + ">=B" + row + ",IF(DATEDIF(B" + row + ",F" + row + ",\"D\")  > 6,\"Yes\",\"No\"),\"N/A\")");
 //Write the event notes and set a border
 sheet.getRange(row, eventTechNotesColumn).setValue(submittedEvent.getTechNotes()).setBorder(false,false,false,true,false,false,"Black",SpreadsheetApp.BorderStyle.SOLID);
 Logger.log("Done!");

 //Release the function lock
 lock.releaseLock();
 Logger.log("Releasing Database Service");
}
 
function getFirstNullCell(sheet){
 var row = 1;
 Logger.log("Getting First Null Cell");
 while (!sheet.getRange(row, eventIdColumn).isBlank()){
   row ++;
 }
 return row;
}