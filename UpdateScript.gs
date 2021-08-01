var siteTabName = ["Google Partner Plex, Mountain View",
                   "The Grove, Redwood City", 
                   "Room 98, Playa Vista",
                   "The Foundry, Dublin",
                   "Partnerplex, São Paulo",
                   "RoundHouse, Singapore",
                   "Partnerplex Stream, Tokyo"];

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
function runUpdates20210731(){
  /*
    This update adds a new column on the spreadsheet "Event Run By"
    
    Notes:
    - [Loader] -  Update Column Number  (39, 40, 41)
    - [Event Class] - Add RunBy         (3, 24, 49, 259)
    - [SummaryController] - Get, Set    (31, 112, 171)
    - [SummaryPage] - Html              (386)

    <div class="item">
      <p>Event Run By</p>
      <select name="eventRunBy" style="font-weight:bold;" value="<?= selectedEvent.getRunBy(); ?>">
        <option value="Site Technician" <?= selectedEvent.getEventRunByDefaultSelected("Site Technician"); ?> >Site Technician</option>
        <option value="TSM" <?= selectedEvent.getEventRunByDefaultSelected("TSM"); ?> >TSM</option>
        <option value="Backfill" <?= selectedEvent.getEventRunByDefaultSelected("Backfill"); ?> >Backfill</option>
      </select>
    </div>
  */

  //Open the spreadsheet
  console.log("Opening Spreadsheet");
  var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetLink);
  var sheet;

  //Open each center tab
  for(var x = 0; x < 7; x++){
    console.log("Opening \"" + siteTabName[x] + "\" sheet");
    sheet = spreadsheet.getSheetByName(siteTabName[x]);

    if(sheet != null){
      console.log("\"" + siteTabName[x] + "\" sheet successfully opened");

      //Add a new tab after "Actual End Time"
      console.log("Adding new column");
      sheet.insertColumnAfter(16);
      sheet.getRange(2,17).setValue("Event Run By");

      //Configure the new Column
      console.log("Formatting new column");
      sheet.getRange(2,16).copyTo(sheet.getRange(2, 17), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false)
      sheet.setColumnWidth(17,130);

      console.log("\"" + siteTabName[x] + "\" done!");
    }
    else{
       console.log("\"" + siteTabName[x] + "\" sheet could not be found");
    }
  }
}