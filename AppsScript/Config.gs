/*******************************************************
 * Letter & File Management System (LFMIS)
 * Version : 1.0
 * File : Config.gs
 *******************************************************/

const CONFIG = {

  SHEETS: {

    DASHBOARD: "Dashboard",

    LETTERS: "Letter Register",

    FILES: "File Register",

    MOVEMENT: "File Movement",

    DISPATCH: "Dispatch Register",

    OFFICERS: "Officers",

    DEPARTMENTS: "Departments",

    TAGS: "Tags",

    STATUS: "Status",

    SEARCH: "Search",

    REPORTS: "Reports",

    SETTINGS: "Settings",

    LOGS: "Logs"

  },



  LETTER_COLUMNS: {

    DIARY_NO:1,

    RECEIPT_DATE:2,

    LETTER_NO:3,

    LETTER_DATE:4,

    FROM_OFFICE:5,

    SUBJECT:6,

    CATEGORY:7,

    PRIORITY:8,

    FILE_NO:9,

    OFFICER:10,

    DUE_DATE:11,

    STATUS:12,

    DRIVE_LINK:13,

    REMARKS:14,

    CREATED_BY:15,

    CREATED_TIME:16

  },



  FILE_COLUMNS:{

    FILE_NO:1,

    TITLE:2,

    SECTION:3,

    SUBJECT:4,

    OPEN_DATE:5,

    OFFICER:6,

    STATUS:7,

    PRIORITY:8,

    COURT_CASE:9,

    CONFIDENTIAL:10,

    LINKED_LETTERS:11,

    REMARKS:12

  },



  STATUS:{

    PENDING:"Pending",

    PROCESS:"Under Process",

    APPROVED:"Approved",

    DISPOSED:"Disposed",

    CLOSED:"Closed"

  },



  TAGS:[

    "Urgent",

    "Court Case",

    "Priority",

    "RTI",

    "Legal",

    "Finance",

    "Medical",

    "Pension",

    "HRA",

    "Audit",

    "Confidential",

    "VIP",

    "Time Bound"

  ],



  COLORS:{

    URGENT:"#ff0000",

    COURT:"#ff9900",

    PRIORITY:"#ffff00",

    CLOSED:"#00aa00",

    OVERDUE:"#990000",

    PROCESS:"#66ccff"

  }

};



function getSheet(name){

  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);

}



function getLettersSheet(){

  return getSheet(CONFIG.SHEETS.LETTERS);

}



function getFilesSheet(){

  return getSheet(CONFIG.SHEETS.FILES);

}



function getDashboardSheet(){

  return getSheet(CONFIG.SHEETS.DASHBOARD);

}



function getMovementSheet(){

  return getSheet(CONFIG.SHEETS.MOVEMENT);

}



function logAction(action,user){

  const sheet=getSheet(CONFIG.SHEETS.LOGS);

  sheet.appendRow([

    new Date(),

    user || Session.getActiveUser().getEmail(),

    action

  ]);

}
