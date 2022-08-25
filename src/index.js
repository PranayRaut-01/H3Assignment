const express = require("express");
const app = express();
const multer = require("multer");
const reader = require("xlsx");
const axios = require("axios");

// File Upload on Server Logic
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./xml");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

// API call
app.post("/products", upload.single("ExlFile"), async (req, res) => {
  try {
    // Reading our excel file
    const doc = reader.readFile("./xml/product_list.xlsx");

    let data = [];

    const sheets = doc.SheetNames;

    const workSheet = doc.Sheets["Sheet1"];

    // converting excel sheet to json
    const existingdata = reader.utils.sheet_to_json(workSheet);

    for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(doc.Sheets[doc.SheetNames[i]]);
      temp.forEach((res) => {
        data.push(res);
      });
    }
    // Axios call for every product _code available
    for (let i = 0; i < data.length; i++) {
      let options = {
        method: "get",
        url: `https://api.storerestapi.com/products/${data[i].product_code}`,
      };

      // Axios call
      let result = await axios(options);

      // adding price key and its value in existing data object
      existingdata[i].price = result.data.data.price;
    }

    // Creating new workbook
    const newWB = reader.utils.book_new();

    //creating new worksheet with price data included
    const newWS = reader.utils.json_to_sheet(existingdata);

    // appending to new workbook
    reader.utils.book_append_sheet(newWB, newWS, "New Data");

    //overwriting original xlsx file with new one
    reader.writeFile(newWB, "./xml/product_list.xlsx");

    //returning new excel sheet to be downloaded
    res.download("./xml/product_list.xlsx");
    
  } catch (Error) {
    return res.status(500).send({ status: false, Error: Error.message });
  }
});

///////////////// [ SERVER CONNECTION ] /////////////////
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
