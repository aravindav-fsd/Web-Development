const axios = require('axios');
const https = require('https');

// Create an HTTPS agent that doesn't reject self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Use the agent in your Axios request
axios.get('https://eua-fin-devapp1:50000/b1s/v2/U_COMPANIES', {
  httpsAgent: httpsAgent,
  headers: {
    'Authorization': 'Bearer b8f7faf4-74d7-11ee-8000-000d3ab9e4ee'
  }
})
.then((response) => {
  console.log('Records retrieved:', response.data.value);
})
.catch((error) => {
  console.error('Error retrieving records:', error);
});
