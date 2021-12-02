const express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

function isValidPosition(a, b){
  return ( a !=null &&  b!=null && a > b)  ? true : false;
}

const URL_API="https://data.gov.il/api/3/action/datastore_search";

app.post('/fetch', async (req, res) => {
  const requestATMs={
    resource_id: 'b9d690de-0a9c-45ef-9ced-3e5957776b26',
    limit: req.body.limit ? req.body.limit : false,
    filters: req.body.filters ? req.body.filters : false
  }

  try{
    const ATMsRes = await axios.post(URL_API, requestATMs);
    const CitiesRes = await axios.get('https://raw.githubusercontent.com/GabMic/israeli-cities-and-streets-list/master/israel_cities_names_and__geometric_data.json');
    res.json({
      ATMs: ATMsRes.data.result.records.filter( z => isValidPosition(z.X_Coordinate, z.Y_Coordinate)),
      Cities: CitiesRes.data
    })
  }
  catch(err){
    console.error(err);
  }
})

app.listen(PORT, () => {
  console.log(`Server run on ${PORT}`);
});