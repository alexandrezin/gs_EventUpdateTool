function createGutsTicket(submittedEvent, siteLocation) {
 
 Logger.log("Waiting For GUTS API Script Lock"); 
 //Lock the function to avoid problems with multiple submissions at the same time
 var lock = LockService.getScriptLock(); //Lock
 lock.waitLock(30000);                   //For 30 sec.
 Logger.log("Starting GUTS API Service");

  //Check for MTV
  if(siteLocation == "Google Partner Plex, Mountain View"){
    var ccList = "cameronle, thongn, arca, ericmejia";
    var region = "AMER";
    var site = "GPP-MTV";
    var attendingTech = "cameronle, thongn";
  }

  //Check for RWC
  else if(siteLocation == "The Grove, Redwood City"){
    var ccList = "glai, uhohyoh, arca, ericmejia, michellelu, trishat";
    var region = "AMER";
    var site = "GRV-RWC";
    var attendingTech = "glai, uhohyoh";
  }

  //Check for PLV
  else if(siteLocation == "Room 98, Playa Vista"){
    var ccList = "marquiscollins, arca, ericmejia";
    var region = "AMER";
    var site = "RDH-PLV";
    var attendingTech = "marquiscollins";
  }

  //Check for DUB
  else if(siteLocation == "The Foundry, Dublin"){
    var ccList = "keithbrady, jamesmadden, colinbyrne, arca, rowenar, ciaranmurphy";
    var region = "EMEA";
    var site = "GPP-DUB";
    var attendingTech = "keithbrady, jamesmadden";
  }

  //Check for SAO
  else if(siteLocation == "Partnerplex, São Paulo"){
    var ccList = "alexandrez, maranovich, colinbyrne, arca, margarethg, renatatavares";
    //var ccList = "alexandrez";
    var region = "LATAM";
    var site = "GPP-SAO";
    var attendingTech = "alexandrez, maranovich";
  }

  //Check for SIN
  else if(siteLocation == "RoundHouse, Singapore"){
    var ccList = "stanleytan, nheng, arca";
    var region = "APAC";
    var site = "RDH-SIN";
    var attendingTech = "stanleytan";
  }

  //Check for TOK
  else if(siteLocation == "Partnerplex Stream, Tokyo"){
     var ccList = "minoruw, midelacruz, nheng, arca";
     var region = "APAC";
     var site = "GPP-TOK";
     var attendingTech = "minoruw, midelacruz";
  }

  //Guts Summary and Description This needs QA
  var summary = "" + submittedEvent.getDate() + " " + siteLocation + " - " + submittedEvent.getType() + " - " + submittedEvent.getName() + " ";
  var description = "" + siteLocation + " " + submittedEvent.getType() + "\n \n" + "Event Name: " + submittedEvent.getName() + "\n Event Date: " + submittedEvent.getDate() + "\n Event Setup Time: " + submittedEvent.getSetupTime() + "\n Event Start Time: " + submittedEvent.getStartTime() + "\n Event End Time: " + submittedEvent.getEndTime() + "\n\n Tech Notes: " + submittedEvent.getTechNotes();

  // The category, type, and item have to exist in GUTS to be used. They are also case-sensitive.
  var priority = getEventPriority(submittedEvent);

  // Get last cell in the last row of the form response sheet to set the created GUTS ticket link
  var formResponses = SpreadsheetApp.getActiveSheet();
  var lastRow = formResponses.getLastRow();
  var regionCell = formResponses.getRange(lastRow, 11);
  var lastCell = formResponses.getRange(lastRow, 12);

  var ticketJSON = {
  "ticket":{
    "core":{
        "requester":submittedEvent.getRequester(),
        "cc":[ccList],
        "status":"Assigned",
        "priority":priority,
        "summary":summary,
        "description":description,
        "group":"cec-event-request"
    },
    "cti":{
        "category":"experience centers",
        "type":"event",
        "item":"event support"
    },
    "cecRequest":{
        "site":site,
        "eventRequest": "true",
        "eventDate": {"month":Utilities.formatDate(new Date(submittedEvent.getDate()),"-0800","MM"),
                      "year":Utilities.formatDate(new Date(submittedEvent.getDate()),"-0800","yyyy"),
                      "day":Utilities.formatDate(new Date(submittedEvent.getDate()),"-0800","dd")
                      },
        "attendingTech":attendingTech,
        "rcaRequired": "false"
      }
    }
  };

  // Make API call to guts to create a ticket
  try {
    var response = Guts.Tickets.create(ticketJSON);
    var ticketId = response.ticket.sys.id;
    Logger.log("Ticket " + ticketId + " created");
    lastCell.setValue('=HYPERLINK("https://gutsv3.corp.google.com/#ticket/' + ticketId + "\"," + ticketId + ")");
    regionCell.setValue(region);

    //Release the function lock
    lock.releaseLock();
    Logger.log("Releasing GUTS API Service");
    
    return ticketId;
  }

  catch(err) { 
    Logger.log("Error trying to create ticket:"); 
    Logger.log(err);
    Logger.log(response);

    //Release the function lock
    lock.releaseLock(); 
    Logger.log("Releasing GUTS API Service");

    return 0;
  }
}