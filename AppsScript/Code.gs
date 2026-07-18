/*****************************************************
 Forest Headquarters e-Office Management System
 Code.gs
*****************************************************/

const APP_NAME = "Forest Headquarters e-Office";

function doGet(e) {

  return HtmlService.createTemplateFromFile("Login")
    .evaluate()
    .setTitle(APP_NAME)
    .setFaviconUrl("https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Include HTML files
 */
function include(filename){
  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}
