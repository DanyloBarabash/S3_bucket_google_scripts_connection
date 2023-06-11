function myFunction() {
    var rows_result = getValueFromRow()

    var date = (rows_result[0]).replace(/\./g, "_") + ".csv"
    var procces = rows_result[1]

    if (procces == true){
      var csv = getCSV(date)
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("conf").getRange("D2").clear()
      if (csv == "error"){
        console.log("error")
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName("conf").getRange("D2").setValue("wrong date")
      } 
      else{
         displayArrayInSheet(csv)
      }
     
      
    }

}

function getCSV(name){
  try{
      S3.init("MY_ACCESS_KEY", "MY_SECRET_KEY")
      return S3.getObject("google-sheet-proj", name, "us-east-1").toString()
  }
  catch (error) {
    return "error"
  }
  
}

function getValueFromRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("conf");

  // Get the range for the specified row
  var rowRange = sheet.getRange(1, 1, 2, sheet.getLastColumn());

  // Get the values from the row
  var rowValues = rowRange.getValues();

  return [rowValues[1][0],rowValues[1][1]]

}

function displayArrayInSheet(array) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Result");
  sheet.getDataRange().clear();
  var rows = array.split("\n");

    for (var i = 0; i < rows.length; i++) {
      var rowValues = rows[i].split(",");
      var rowRange = sheet.getRange(i + 1, 1, 1, rowValues.length);
      rowRange.setValues([rowValues]);
  }
}
