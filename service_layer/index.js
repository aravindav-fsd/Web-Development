const axios = require('axios');

const sapB1Login = async (username, password,companydb, baseUrl) => {
  const authData = {
    UserName: username,
    Password: password,
    CompanyDB:companydb,
  };

  try {
    const response = await axios.post(`${baseUrl}/Login`, authData);
    // Extract and return the session ID
    return response.data.SessionId;
  } catch (error) {
    // Handle authentication error
    console.error('Login failed:', error.message);
    return null;
  }
};

// Usage:
const username = 'manager';
const password = 'FinDev1!@';
const baseUrl = 'https://eua-fin-devapp1:50000/b1s/v2/Login';
const companydb = 'Master_Data';

sapB1Login(username, password,companydb, baseUrl)
  .then((sessionId) => {
    if (sessionId) {
      console.log('Successfully logged in. Session ID:', sessionId);
      // You can use this sessionId for subsequent requests.
    } else {
      console.log('Login failed.');
    }
  });
