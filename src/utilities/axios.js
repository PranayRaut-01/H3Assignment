const axios = require("axios");

const getData = async (data, existingdata) => {
  try {
    const promiseArray = [];
    // Axios call for every product _code available
    for (let i = 0; i < data.length; i++) {
        
      let options = {
        method: "get",
        url: `https://api.storerestapi.com/products/${data[i].product_code}`,
      };

      // Axios call
      let result = axios(options);

      promiseArray.push(result);  //adding pending promises in newArray
    }

    for (let i = 0; i < promiseArray.length; i++) {
      const result = await promiseArray[i];

      // adding price key and its value in existingdata object
      existingdata[i].price = result.data.data.price;
    }
    return existingdata;

  } catch (error) {
    return res.status(500).send({ status: false, Error: Error.message });
  }
};

module.exports = { getData };
