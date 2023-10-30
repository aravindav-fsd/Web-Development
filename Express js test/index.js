//import express from "express";
const express = require("express");
const axios = require('axios');
const https = require('https');

const app = express();
const port = 3000;

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





app.post('/login',(req,res)=>{
   
    axios.post('https://eua-fin-devapp1:50000/b1s/v2/Login', loginData, {
  httpsAgent: httpsAgent,
})
  .then((response) => {
    res.send(`Login successful: ${response.data}`);
    sessionId = response.data.SessionId; // Assuming the session ID key is 'SessionId'
    /*console.log('Login successful:', response.data);
    console.log('Session retrieved:', sessionId);
    // Now that you're logged in, you can perform other operations using the returned session ID.
    //fetchDataWithSession(sessionId);*/
  })
  .catch((error) => {
    console.error('Error logging in:', error);
  });

});

app.post('/logout',(req,res)=>{
    axios.post('https://eua-fin-devapp1:50000/b1s/v2/Logout', {
        httpsAgent: httpsAgent,
        headers: {
            'Authorization': `Bearer ${sessionId}`
          }
      })
        .then((response) => {
          res.send(`Logout successful ${sessionId}`);
          /*sessionId = response.data.SessionId; // Assuming the session ID key is 'SessionId'
          console.log('Login successful:', response.data);
          console.log('Session retrieved:', sessionId);
          // Now that you're logged in, you can perform other operations using the returned session ID.
          //fetchDataWithSession(sessionId);*/
        })
        .catch((error) => {
            res.send('Error logging in');
          console.error('Error logging in:', error);
        });
      
});

app.post("/crud",(req,res)=>{
    //console.log(`Server started on ${port}`);
    
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
      //console.log('Records retrieved:', response.data.value);

      res.send(response.data.value);
    })
    .catch((error) => {
      console.error('Error retrieving records:', error);
    });
  }

    });
    //app.get("/",(req,res)=>{console.log("")});
app.listen(port,()=>{
console.log(`Server started on ${port}`);
});