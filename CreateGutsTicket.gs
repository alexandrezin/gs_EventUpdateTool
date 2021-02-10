function createGutsTicket(submittedEvent, siteLocation) {

  //Check for MTV
  if(siteLocation == "Google Partner Plex, Mountain View"){
    var assignee = "cameronle";
    var ccList = "cameronle, lcahill, arca, ericmejia";
    var region = "AMER";
    var site = "GPP-MTV";
    var attendingTech = "cameronle, lcahill";
  }

  //Check for RWC
  else if(siteLocation == "The Grove, Redwood City"){
    var assignee = "uhohyoh";
    var ccList = "glai, uhohyoh, arca, ericmejia";
    var region = "AMER";
    var site = "GRV-RWC";
    var attendingTech = "glai, uhohyoh";
  }

  //Check for PLV
  else if(siteLocation == "Room 98, Playa Vista"){
    var assignee = "marquiscollins";
    var ccList = "marquiscollins, arca, ericmejia";
    var region = "AMER";
    var site = "RDH-PLV";
    var attendingTech = "marquiscollins";
  }

  //Check for DUB
  else if(siteLocation == "The Foundry, Dublin"){
    var assignee = "jamesmadden";
    var ccList = "keithbrady, jamesmadden, colinbyrne, arca";
    var region = "EMEA";
    var site = "GPP-DUB";
    var attendingTech = "keithbrady, jamesmadden";
  }

  //Check for SAO
  else if(siteLocation == "Partnerplex, São Paulo"){
    var assignee = "alexandrez";
    var ccList = "alexandrez, maranovich, colinbyrne, arca";
    var region = "LATAM";
    var site = "GPP-SAO";
    var attendingTech = "alexandrez, maranovich";
  }

  //Check for SIN
  else if(siteLocation == "RoundHouse, Singapore"){
    var assignee = "cameronle";
    var ccList = "stanleytan, nheng, arca";
    var region = "APAC";
    var site = "RDH-SIN";
    var attendingTech = "stanleytan";
  }

  //Check for TOK
  else if(siteLocation == "Partnerplex Stream, Tokyo"){
     var assignee = "minoruw";
     var ccList = "minoruw, midelacruz, nheng, arca";
     var region = "APAC";
     var site = "GPP-TOK";
     var attendingTech = "minoruw, midelacruz";
  }

  //Guts Summary and Description This needs QA
  var summary = "" + submittedEvent.getDate() + " " + siteLocation + " - " + submittedEvent.getType() + " - " + submittedEvent.getName() + " ";
  var description = "" + siteLocation + " " + submittedEvent.getType() + "\n \n" + "Event Name: " + submittedEvent.getName() +"\n Event Setup Time: " + submittedEvent.getSetupTime() + "\n Event Start Time: " + submittedEvent.getStartTime() + "\n Event End Time: " + submittedEvent.getEndTime() + "\n Tech Notes:" + submittedEvent.getTechNotes();

  // The category, type, and item have to exist in GUTS to be used. They are also case-sensitive.
  var priority = "low";

  // Get last cell in the last row of the form response sheet to set the created GUTS ticket link
  var formResponses = SpreadsheetApp.getActiveSheet();
  var lastRow = formResponses.getLastRow();
  var regionCell = formResponses.getRange(lastRow, 11);
  var lastCell = formResponses.getRange(lastRow, 12);

  var ticketJSON = {
  "ticket":{
    "core":{
        "requester":submittedEvent.getRequester(),
        "assignee":assignee,
        "cc":[ccList],
        "status":"Pending",
        "pendingWhat":"Pending Project",
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

  Logger.log(ticketJSON);

  // Make API call to guts to create a ticket
  try {
    var response = Guts.Tickets.create(ticketJSON);
    var ticketId = response.ticket.sys.id;
    Logger.log("Ticket " + ticketId + " created");
    lastCell.setValue('=HYPERLINK("https://gutsv3.corp.google.com/#ticket/' + ticketId + "\"," + ticketId + ")");
    regionCell.setValue(region);

    return ticketId;
  }

  catch(err) {  
    Logger.log(err);
    Logger.log(response);

    return 0;
  }
}