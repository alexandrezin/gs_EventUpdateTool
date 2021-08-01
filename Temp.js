<script>
      function highlightFieldRed(fieldId){
        document.getElementById(fieldId).style.backgroundColor = "#ffe6e6";
      }

      function highlightFieldStrongRed(fieldId){
        document.getElementById(fieldId).style.backgroundColor = "#ff0000";
      }

      function refreshStatusColor(fieldObject){
        var color;

        if (fieldObject.value == "Scheduled") color = "#007ff1";
        else if (fieldObject.value == "Done") color = "#30b700";
        else if (fieldObject.value == "Rescheduled") color = "#0055ec";
        else if (fieldObject.value == "Cancelled") color = "#e80000";
        else if (fieldObject.value == "Pending Date") color = "#d7a000";
        else if (fieldObject.value == "Pending Assignment") color = "#ff9900";

        fieldObject.style.backgroundColor = color;  
      }
      
      function refreshBg(fieldObject){
        fieldObject.style.backgroundColor = "#ffffff";
      }

      function handleFormSubmit(formObject) {
        var error = "";

        var setupTime = document.getElementById('eventSetupTime').value;
        var startTime = document.getElementById('eventStartTime').value;
        var endTime = document.getElementById('eventEndTime').value;
        
        var actualSetupTime = document.getElementById('eventActualSetupTime').value;
        var actualStartTime = document.getElementById('eventActualStartTime').value;
        var actualEndTime = document.getElementById('eventActualEndTime').value;
        var incidents = document.getElementById('eventIncidents').value;
        var observations = document.getElementById('eventObservations').value;
        
        var status = document.getElementById('eventStatus').value;
        var assignee = document.getElementById('eventAssignee').value;

        var popup = document.createElement("IFRAME");
        popup.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(popup);

        if(status == "Done"){
          if(actualSetupTime == "" || actualStartTime == "" || actualEndTime == "" || eventRunBy == "" ||incidents == ""){
            highlightFieldRed('eventActualSetupTime');
            highlightFieldRed('eventActualStartTime');
            highlightFieldRed('eventActualEndTime');
            highlightFieldRed('eventRunBy');
            highlightFieldRed('eventIncidents');

            window.frames[0].window.alert("Please provide the post-event information");
            popup.remove();
            return false;
          }
          else{
            if(incidents == "Yes" && observations == ""){
              highlightFieldRed('eventObservations');

              window.frames[0].window.alert("Please provide details of the incident");
              popup.remove();
              return false;
            }
          }
        }

        if(status != "Pending Assignment" && assignee == ""){
          highlightFieldRed('eventAssignee');

          window.frames[0].window.alert("Please provide the event assignee");
          popup.remove();
          return false;
        }

        if(status == "Pending Assignment" && assignee != ""){
          highlightFieldStrongRed('eventStatus');

          window.frames[0].window.alert("Please update the event status");
          popup.remove();
          return false;
        }

        if(setupTime > startTime) error = "eventSetupTime";
        else if(startTime > endTime) error = "eventStartTime";
        else if(actualSetupTime > actualStartTime) error = "eventActualSetupTime";
        else if(actualStartTime > actualEndTime) error = "eventActualStartTime";

        if (error != ""){
          document.getElementById(error).style.backgroundColor = "#ffe6e6";
          window.frames[0].window.alert("Please review the " + error + " field.");
          popup.remove();
          return false;
        }

        else{
            google.script.run.processForm(formObject);
        }
      }
    </script>