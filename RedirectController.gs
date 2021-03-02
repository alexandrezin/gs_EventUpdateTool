var redirectLink = "";

function openReportBug(){
  redirectTo("mailto:alexandrez@google.com,uhohyoh@google.com,glai@google.com,maranovich@google.com?subject=%5BEventTracker%5D%5BBugReport%5D%20-%20Bug%20Title&body=Please%20provide%20a%20detailed%20description%20of%20what%20happened%3A%0D%0A-%0D%0A-%0D%0A-%0D%0A-%0D%0A%0D%0ADay%3A%0D%0ATime%3A%0D%0A%0D%0AScreenshots%3A");
}

function openGoogleForms(){
  redirectTo("https://docs.google.com/forms/d/e/1FAIpQLSeehRftc3aUwGLxPcV0J1yNmAuBXO4MAwXMHDPDQI5jGGzSRQ/viewform?usp=sf_link");
}

function openHelpSite(){
  redirectTo("https://sites.google.com/corp/google.com/event-tracker-help/home");
}

//-----------------------------------------

function redirectTo(link){
    redirectLink = link;  
    showWebPage("RedirectPage", "Please Wait", "90", "1");
}