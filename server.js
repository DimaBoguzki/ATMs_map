const express = require('express');
const PORT = process.env.PORT || 5000;
const axios = require('axios');

const app = express();

app.post('/fetch', (req, res) => {
  axios.post("https://data.gov.il/api/3/action/datastore_search", {
    resource_id: 'b9d690de-0a9c-45ef-9ced-3e5957776b26',
    limit: 100
  })
  .then(data=>{
    res.json(data.data.result)
  })
  .catch((err)=>{
    console.error(err);
  })
})

app.listen(PORT, () => {
  console.log(`Server run on ${PORT}`);
});