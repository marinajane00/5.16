var xlsx=require("xlsx");
//console.log(xlsx)
var workbook=xlsx.readFile("test.xls")
//console.log(workbook)
var sheetNames=workbook.SheetNames;
//console.log(sheetNames)
var worksheet = workbook.Sheets[sheetNames[0]];
//console.log(worksheet)//!特殊字段
var data=xlsx.utils.sheet_to_json(worksheet)
console.log(data)
