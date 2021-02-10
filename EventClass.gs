class Event {

  constructor(id, requestDate, requester, type, name, date, setupTime, startTime, endTime, status, notifiedInAdvance, techNotes, actualSetupTime, actualStartTime, actualEndTime, incidents, observations, htmlContent) {
    
    //Attributes
    this.id = id;
    this.requestDate = requestDate;
    this.requester = requester;
    this.type = type;
    this.name = name;
    this.date = date;
    this.setupTime = setupTime;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.notifiedInAdvance = notifiedInAdvance;
    this.techNotes = techNotes;
    this.actualSetupTime = actualSetupTime;
    this.actualStartTime = actualStartTime;
    this.actualEndTime = actualEndTime;
    this.incidents = incidents;
    this.observations = observations;

    //Methods
    this.toString=function(){
      return "ID: "               + this.getId()
        + "\nRequestDate: "       + this.getRequestDate()
        + "\nRequester: "         + this.getRequester()
        + "\nType: "              + this.getType()
        + "\nName: "              + this.getName()
        + "\nDate: "              + this.getDate()
        + "\nSetupTime: "         + this.getSetupTime()
        + "\nStartTime: "         + this.getStartTime()
        + "\nEndTime: "           + this.getEndTime()
        + "\nStatus: "            + this.getStatus()
        + "\nNotifiedInAdvance: " + this.getNotifiedInAdvance()
        + "\nTechNotes: "         + this.getTechNotes()
        + "\nActualSetupTime: "   + this.getActualSetupTime()
        + "\nActualStartTime: "   + this.getActualStartTime()
        + "\nActualEndTime: "     + this.getActualEndTime()
        + "\nIncidents: "         + this.getIncidents()
        + "\nObservations: "      + this.getObservations();
    }

    this.getEventStatusDefaultSelected=function(option){
      if (option == this.status){
        return "selected";
      }
      else return "";
    }

    this.getEventTypeDefaultSelected=function(option){
      if (option == this.type){
        return "selected";
      }
      else return "";
    }

    this.getEventIncidentsDefaultSelected=function(option){
      if (option == this.incidents){
        return "selected";
      }
      else return "";
    }

    this.getStatusColor=function(){
      switch (this.status){
        case "Scheduled":
          return "#007ff1";
        case "Done":
          return "#30b700";
        case "Rescheduled":
          return "#0055ec";
        case "Cancelled":
          return "#e80000";
        case "Pending Date":
          return "#d7a000";        
        default:
          return "#000000";
      }
    }

    this.getShortName=function(){
      var shortName = this.name;

      if (shortName.length > 40){
        return shortName.slice(0,37) + " . . .";
      }
      else{
        return shortName;
      }
    }

    //GET-SET id
    this.setId=function(id){
      this.id = id;
    };
    this.getId=function(){
      return this.id;
    }

    //GET-SET requestDate
    this.setRequestDate=function(requestDate){
      this.requestDate = Utilities.formatDate(new Date(requestDate),"GMT-0800", "yyyy-MM-dd");
    };
    this.getRequestDate=function(){
      return this.requestDate;
    }

    //GET-SET requester
    this.setRequester=function(requester){
      this.requester = requester;
    };
    this.getRequester=function(){
      return this.requester;
    }

    //GET-SET type
    this.setType=function(type){
      this.type = type;
    };
    this.getType=function(){
      return this.type;
    }

    //GET-SET name
    this.setName=function(name){
      this.name = name;
    };
    this.getName=function(){
      return this.name;
    }

    //GET-SET date
    this.setDate=function(date){
      this.date = Utilities.formatDate(new Date(date),"GMT-0800", "yyyy-MM-dd");
    };
    this.getDate=function(){
      return this.date;
    }

    //GET-SET setupTime
    this.setSetupTime=function(setupTime){
      this.setupTime = Utilities.formatDate(new Date(setupTime),"GMT-0800", "HH:mm");
    };
    this.getSetupTime=function(){
      return this.setupTime;
    }

    //GET-SET startTime
    this.setStartTime=function(startTime){
      this.startTime = Utilities.formatDate(new Date(startTime),"GMT-0800", "HH:mm");
    };
    this.getStartTime=function(){
      return this.startTime;
    }

    //GET-SET endTime
    this.setEndTime=function(endTime){
      this.endTime = Utilities.formatDate(new Date(endTime),"GMT-0800", "HH:mm");
    };
    this.getEndTime=function(){
      return this.endTime;
    }

    //GET-SET status
    this.setStatus=function(status){
      this.status = status;
    };
    this.getStatus=function(){
      return this.status;
    }

    //GET-SET notifiedInAdvance
    this.setNotifiedInAdvance=function(notifiedInAdvance){
      this.notifiedInAdvance = notifiedInAdvance;
    };
    this.getNotifiedInAdvance=function(){
      return this.notifiedInAdvance;
    }

    //GET-SET techNotes
    this.setTechNotes=function(techNotes){
      this.techNotes = techNotes;
    };
    this.getTechNotes=function(){
      return this.techNotes;
    }

    //GET-SET actualSetupTime
    this.setActualSetupTime=function(actualSetupTime){
      this.actualSetupTime = Utilities.formatDate(new Date(actualSetupTime),"GMT-0800", "HH:mm");
    };
    this.getActualSetupTime=function(){
      return this.actualSetupTime;
    }

    //GET-SET actualStartTime
    this.setActualStartTime=function(actualStartTime){
      this.actualStartTime = Utilities.formatDate(new Date(actualStartTime),"GMT-0800", "HH:mm");
    };
    this.getActualStartTime=function(){
      return this.actualStartTime;
    }

    //GET-SET actualEndTime
    this.setActualEndTime=function(actualEndTime){
      this.actualEndTime = Utilities.formatDate(new Date(actualEndTime),"GMT-0800", "HH:mm");
    };
    this.getActualEndTime=function(){
      return this.actualEndTime;
    }

    //GET-SET incidents
    this.setIncidents=function(incidents){
      this.incidents = incidents;
    };
    this.getIncidents=function(){
      return this.incidents;
    }

    //GET-SET observations
    this.setObservations=function(observations){
      this.observations = observations;
    };
    this.getObservations=function(){
      return this.observations;
    }
  }
}