const axios = require('axios');
const https = require('https');

let sessionId;

// Create an HTTPS agent that doesn't reject self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const loginData = {
  UserName: 'manager',
  Password: 'FinDev1!@', // Provide the actual password here
  CompanyDB: 'Master_Data',
};

// Login functionality
axios.post('https://eua-fin-devapp1:50000/b1s/v2/Login', loginData, {
  httpsAgent: httpsAgent,
})
  .then((response) => {
    sessionId = response.data.SessionId; // Assuming the session ID key is 'SessionId'
    console.log('Login successful:', response.data);
    console.log('Session retrieved:', sessionId);
    // Now that you're logged in, you can perform other operations using the returned session ID.
    fetchDataWithSession(sessionId);
  })
  .catch((error) => {
    console.error('Error logging in:', error);
  });

// CRUD functionality
function fetchDataWithSession(sessionId) {
  axios.get('https://eua-fin-devapp1:50000/b1s/v2/U_PAY_ALLOC', {
    httpsAgent: httpsAgent,
    headers: {
      'Authorization': `Bearer ${sessionId}`
    }
  })
  .then((response) => {
    console.log('Records retrieved:', response.data.value);
  })
  .catch((error) => {
    console.error('Error retrieving records:', error);
  });
}
