const reader = require("xlsx");
const {getData} =require("../utilities/axios");
const os = require("os")
const tempDir = os.tmpdir();

const addPrice  = async (req, res) => {
    try {
      // Reading our excel file
      let file = req.files
      const doc = reader.read(file[0].buffer);
  
      let data = [];
  
      const sheets = doc.SheetNames;
  
      const workSheet = doc.Sheets["Sheet1"];
  
      // converting excel sheet to json
      let existingdata = reader.utils.sheet_to_json(workSheet);
  
      for (let i = 0; i < sheets.length; i++) {
        const temp = reader.utils.sheet_to_json(doc.Sheets[doc.SheetNames[i]]);
        temp.forEach((res) => {
          data.push(res);
        }); 
      }


      // adding price key and its value in existing data object
       const updatedData = await getData(data,existingdata) //call to axios.js in utilities

      // Creating new workbook
      const newWB = reader.utils.book_new();
  
      //creating new worksheet with price data included
      const newWS = reader.utils.json_to_sheet(updatedData);
  
      // appending to new workbook
      reader.utils.book_append_sheet(newWB, newWS, "Sheet1");
  
      //overwriting original xlsx file with new one
      reader.writeFile(newWB, tempDir+"/product_list.xlsx");
  
      //returning new excel sheet to be downloaded
      res.download(tempDir+"/product_list.xlsx");
      
    } catch (Error) {
      return res.status(500).send({ status: false, Error: Error.message });
    }
  }

  module.exports = {addPrice}