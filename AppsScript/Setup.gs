/*******************************************************
 * Setup.gs
 * Government Letter & File Management System
 * Version 1.0
 *******************************************************/

function initializeSystem() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheets = [
    {
      name: "Dashboard",
      headers: ["Item", "Value"]
    },
    {
      name: "Letter_Register",
      headers: [
        "Diary_No","Receipt_Date","Letter_No","Letter_Date",
        "Sender","Department","Subject","Category",
        "Priority","Tag","File_No","Assigned_To",
        "Due_Date","Status","Remarks","Drive_Link",
        "Created_By","Created_Date","Updated_By","Updated_Date"
      ]
    },
    {
      name: "Dispatch_Register",
      headers: [
        "Dispatch_No","Dispatch_Date","Letter_No","File_No",
        "To","Subject","Mode","Postal_Receipt","Remarks"
      ]
    },
    {
      name: "File_Register",
      headers: [
        "File_No","File_Title","Section","Subject",
        "Open_Date","Current_Officer","Priority",
        "Court_Case","Confidential","Status",
        "Closing_Date","Remarks"
      ]
    },
    {
      name: "File_Movement",
      headers: [
        "Movement_ID","File_No","From_Officer",
        "To_Officer","Movement_Date",
        "Action","Remarks","Received"
      ]
    },
    {
      name: "Attachments",
      headers: [
        "Attachment_ID","Diary_No","File_No",
        "Drive_Link","Uploaded_By","Upload_Date"
      ]
    },
    {
      name: "Officers",
      headers: [
        "Officer_ID","Name","Designation",
        "Department","Email","Mobile","Active"
      ]
    },
    {
      name: "Departments",
      headers: [
        "Department_ID","Department_Name"
      ]
    },
    {
      name: "Sections",
      headers: [
        "Section_ID","Department","Section_Name"
      ]
    },
    {
      name: "Categories",
      headers: [
        "Category"
      ]
    },
    {
      name: "Tags",
      headers: [
        "Tag"
      ]
    },
    {
      name: "Status",
      headers: [
        "Status"
      ]
    },
    {
      name: "Priority",
      headers: [
        "Priority"
      ]
    },
    {
      name: "Users",
      headers: [
        "User_ID","Name","Email","Role","Status"
      ]
    },
    {
      name: "Audit_Log",
      headers: [
        "Date","User","Action","Module","Record"
      ]
    },
    {
      name: "Settings",
      headers: [
        "Key","Value"
      ]
    }
  ];

  sheets.forEach(function(sheetInfo){

    let sh = ss.getSheetByName(sheetInfo.name);

    if(!sh){
      sh = ss.insertSheet(sheetInfo.name);
    }

    sh.clear();

    sh.getRange(1,1,1,sheetInfo.headers.length)
      .setValues([sheetInfo.headers]);

    sh.getRange(1,1,1,sheetInfo.headers.length)
      .setFontWeight("bold")
      .setBackground("#1F4E78")
      .setFontColor("white");

    sh.setFrozenRows(1);

    sh.autoResizeColumns(1,sheetInfo.headers.length);

    if(sh.getMaxRows()<500){
      sh.insertRowsAfter(
        sh.getMaxRows(),
        500-sh.getMaxRows()
      );
    }

    sh.getRange(1,1,sh.getLastRow(),sheetInfo.headers.length)
      .createFilter();

  });

  SpreadsheetApp.getUi().alert(
    "Letter & File Management System initialized successfully."
  );

}
