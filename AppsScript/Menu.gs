/*******************************************************
 * Menu.gs
 * Letter & File Management System
 *******************************************************/

function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("📁 Letter Management")

    .addItem("Dashboard", "openDashboard")

    .addSeparator()

    .addItem("New Letter", "newLetter")

    .addItem("New File", "newFile")

    .addSeparator()

    .addItem("Search Letter", "searchLetter")

    .addItem("Pending Letters", "pendingLetters")

    .addItem("Court Cases", "courtCases")

    .addItem("Urgent Letters", "urgentLetters")

    .addSeparator()

    .addItem("Reports", "reports")

    .addSeparator()

    .addItem("Settings", "settings")

    .addToUi();

}



function openDashboard(){

  SpreadsheetApp.getActiveSpreadsheet()
  .setActiveSheet(getDashboardSheet());

}



function newLetter(){

  SpreadsheetApp.getUi()
  .alert("New Letter Entry module will be added next.");

}



function newFile(){

  SpreadsheetApp.getUi()
  .alert("New File Entry module will be added next.");

}



function searchLetter(){

  SpreadsheetApp.getUi()
  .alert("Search module will be added next.");

}



function pendingLetters(){

  SpreadsheetApp.getUi()
  .alert("Pending Letter module will be added next.");

}



function courtCases(){

  SpreadsheetApp.getUi()
  .alert("Court Case module will be added next.");

}



function urgentLetters(){

  SpreadsheetApp.getUi()
  .alert("Urgent Letter module will be added next.");

}



function reports(){

  SpreadsheetApp.getUi()
  .alert("Reports module will be added next.");

}



function settings(){

  SpreadsheetApp.getUi()
  .alert("Settings module will be added next.");

}
