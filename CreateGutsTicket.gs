function createGutsTicket(submittedEvent, siteLocation) {

  //Check for MTV
  if(siteLocation == 'Google Partner Plex, Mountain View'){
    var assignee = 'cameronle';
    var ccList = 'cameronle, lcahill, arca, ericmejia';
    var region = 'AMER';
  }

  //Check for RWC
  else if(siteLocation == 'The Grove, Redwood City'){
    var assignee = 'uhohyoh';
    var ccList = 'glai, uhohyoh, arca, ericmejia';
    var region = 'AMER';
  }

  //Check for PLV
  else if(siteLocation == 'Room 98, Playa Vista'){
    var assignee = 'marquiscollins';
    var ccList = 'marquiscollins, arca, ericmejia';
    var region = 'AMER';
  }

  //Check for DUB
  else if(siteLocation == 'The Foundry, Dublin'){
    var assignee = 'jamesmadden';
    var ccList = 'keithbrady, jamesmadden, colinbyrne, arca';
    var region = 'EMEA';
  }

  //Check for SAO
  else if(siteLocation == 'Partnerplex, São Paulo'){
    var assignee = 'alexandrez';
    var ccList = 'alexandrez, maranovich, colinbyrne, arca';
    var region = 'LATAM';
  }

  //Check for SIN
  else if(siteLocation == 'RoundHouse, Singapore'){
    var assignee = 'cameronle';
    var ccList = 'stanleytan, nheng, arca';
    var region = 'APAC';
  }

  //Check for TOK
  else if(siteLocation == 'Partnerplex Stream, Tokyo'){
     var assignee = 'minoruw';
     var ccList = 'minoruw, midelacruz, nheng, arca';
     var region = 'APAC';
  }

  //Guts Summary and Description This needs QA
  var summary = "" + submittedEvent.getDate() + " " + siteLocation + " " + submittedEvent.getType() + " " + submittedEvent.getName() + " ";
  var description = "" + siteLocation + " " + submittedEvent.getType() + "\n \n" + "Event Name: " + submittedEvent.getName() +"\n Event Setup Time: " + submittedEvent.getSetupTime() + "\n Event Start Time: " + submittedEvent.getStartTime() + "\n Event End Time: " + submittedEvent.getEndTime() + "\n Tech Notes:" + submittedEvent.getTechNotes();


  // The category, type, and item have to exist in GUTS to be used. They are also case-sensitive.
  var guts_group = 'cec-event-request';
  var priority = 'low';
  var category = 'experience centers';
  var type = 'event';
  var item = 'event support';

  // Get last cell in the last row of the form response sheet to set the created GUTS ticket link
  var formResponses = SpreadsheetApp.getActiveSheet();
  var lastRow = formResponses.getLastRow();
  var regionCell = formResponses.getRange(lastRow, 11);
  var lastCell = formResponses.getRange(lastRow, 12);

  // Set up the data to be sent.
  var entry = {'core': {'requester': submittedEvent.getRequester(), // This will be the GUTS requester.
                        'assignee' : assignee,
                        'priority': priority,
                        'summary': summary,
                        'description': description,
                        'group': guts_group,
  //                       'cc': ccList
                      },
              'cti': {'category': category,
                      'type': type,
                      'item': item}                        
                      };

  Logger.log(entry);

  // Make API call to guts to create a ticket
  try {
    var request = {'ticket': entry};
    var response = Guts.Tickets.create(request);
    var ticketId = response.ticket.sys.id;
    Logger.log('Ticket ' + ticketId + ' created');
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