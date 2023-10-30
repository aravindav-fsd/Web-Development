const axios = require('axios');
const https = require('https');

// Create an HTTPS agent that doesn't reject self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const loginData = {
  UserName: 'manager',
  Password: 'FinDev1!@', // Provide the actual password here
  CompanyDB: 'Master_Data',
};

axios.get('https://eua-fin-devapp1:50000/b1s/v2/U_COMPANIES', loginData, {
  httpsAgent: httpsAgent,
})
  .then((response) => {
    console.log('Login successful:', response.data);
    // Now that you're logged in, you can perform other operations using the returned session ID.
  })
  .catch((error) => {
    console.error('Error logging in:', error);
  });
