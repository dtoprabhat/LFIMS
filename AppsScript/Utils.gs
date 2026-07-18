/*******************************************************
 * Utils.gs
 * Government Letter & File Management System
 * Version 1.0
 *******************************************************/

/**
 * Return spreadsheet
 */
function getSS() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Return sheet by name
 */
function getSheet(sheetName) {
  return getSS().getSheetByName(sheetName);
}

/**
 * Format date as dd/MM/yyyy
 */
function formatDate(date) {
  if (!date) return "";
  return Utilities.formatDate(
    new Date(date),
    Session.getScriptTimeZone(),
    "dd/MM/yyyy"
  );
}

/**
 * Current user email
 */
function getCurrentUser() {
  try {
    return Session.getActiveUser().getEmail();
  } catch (e) {
    return "Unknown User";
  }
}

/**
 * Current timestamp
 */
function now() {
  return new Date();
}

/**
 * Generate Diary Number
 * Format : 2026-000001
 */
function generateDiaryNumber() {

  const sh = getSheet("Letter_Register");

  const lastRow = sh.getLastRow();

  const year = new Date().getFullYear();

  if (lastRow <= 1) {
    return year + "-000001";
  }

  const lastDiary = sh.getRange(lastRow, 1).getValue();

  if (!lastDiary) {
    return year + "-000001";
  }

  const parts = lastDiary.toString().split("-");

  let running = 1;

  if (parts.length == 2) {
    running = parseInt(parts[1], 10) + 1;
  }

  return year + "-" + ("000000" + running).slice(-6);

}

/**
 * Generate File Number
 * Format : FILE-2026-000001
 */
function generateFileNumber() {

  const sh = getSheet("File_Register");

  const lastRow = sh.getLastRow();

  const year = new Date().getFullYear();

  if (lastRow <= 1) {
    return "FILE-" + year + "-000001";
  }

  const value = sh.getRange(lastRow, 1).getValue();

  if (!value) {
    return "FILE-" + year + "-000001";
  }

  const lastPart = value.toString().split("-").pop();

  const next = parseInt(lastPart,10)+1;

  return "FILE-" + year + "-" + ("000000"+next).slice(-6);

}

/**
 * Audit Log
 */
function writeAudit(action,module,record){

  const sh = getSheet("Audit_Log");

  sh.appendRow([
    new Date(),
    getCurrentUser(),
    action,
    module,
    record
  ]);

}

/**
 * Validate required fields
 */
function isBlank(value){

  return value===null ||
         value===undefined ||
         value==="";
}

/**
 * Success Response
 */
function success(message,data){

  return{

    success:true,

    message:message,

    data:data || null

  };

}

/**
 * Error Response
 */
function failure(message){

  return{

    success:false,

    message:message

  };

}

/**
 * Find row by first column
 */
function findRow(sheetName,id){

  const sh=getSheet(sheetName);

  const values=sh.getRange(2,1,sh.getLastRow()-1,1).getValues();

  for(let i=0;i<values.length;i++){

    if(values[i][0]==id){

      return i+2;

    }

  }

  return -1;

}

/**
 * Delete Row
 */
function deleteRecord(sheetName,id){

  const row=findRow(sheetName,id);

  if(row==-1){

    return failure("Record not found.");

  }

  getSheet(sheetName).deleteRow(row);

  writeAudit("DELETE",sheetName,id);

  return success("Record deleted.");

}
