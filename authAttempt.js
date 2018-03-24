var https = require('https');
var queryString = require('querystring');

// Assemble the request message headers
var requestHeaders = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwicGNrIjoxLCJhbGciOiJkaXIiLCJ0diI6Miwia2lkIjoicjRxIn0..rRczAtiR170kYDFzGn6alQ.oMF-8gFr67zsbBWMviAxd8dHZUzl54XXazZIqFTcxMA_IGSzMeVV-burxiTIJNKe31vnH8I_9xruRl7tKaH-7XFgkia_x3gd7f8iwj12LTtzzF306zGTmeydOOuQy0399nZwL0lTttbSH8W0FyTE0_jIxPZ-Fdd-rUzwA4UbEiyiXEstsibGFnA0qAHfLK6zl4OpV7xEX_qCz7CPQga7Yew5hICTLYTK-wLyPBo7AmU.Yh5Sqaya-06jwtwQiDXVTw',
  'Accept': 'application/json;v=2'
}

// Write the request body
requestBody = JSON.stringify({
  "applicants": [
    {
      "applicantRole": "primary",
      "firstName": "Nicole",
      "middleName": "Simone",
      "lastName": "Jackson",
      "taxIdType": "SSN",
      "taxId": "000-00-0001",
      "dateOfBirth": "1991-11-22",
      "homeAddress": {
        "addressLine1": "1234 Main Street",
        "addressLine2": "Apt. 604",
        "city": "Your Town",
        "stateCode": "VA",
        "postalCode": "22102"
      },
      "mailingAddress": {
        "addressLine1": "15 N. South St",
        "addressLine2": "Unit 6",
        "city": "Work",
        "stateCode": "VA",
        "postalCode": "22102"
      },
      "mobilePhoneNumber": {
        "phoneNumber": "1111111111",
        "acceptedTcpa": true
      },
      "homePhoneNumber": {
      },
      "workPhoneNumber": {
      },
      "emailAddress": "nsjackson@myemail.com",
      "backupWithholding": false,
      "citizenshipCountry": "USA",
      "secondaryCitizenshipCountry": "CAN",
      "employmentStatus": "Employed",
      "jobTitle": "Manager",
      "annualIncome": 75000
    }
  ],
  "productId": "3000",
  "cdTerm": "12M",
  "fundingDetails": {
    "fundingType": "fundach",
    "fundingAmount": 20.0,
    "externalAccountDetails": {
      "accountNumber": "0987654",
      "bankABANumber": "121000248",
      "accountOwnership": "primary"
    }
  },
  "termsAndConditions": {
    "acceptAccountDisclosures": true,
    "acceptPaperlessAgreement": true,
    "acceptFraudProtection": true
  }
})

// Assemble the calling options for the request message
var options = {
  method: 'POST', 
  hostname: 'api-sandbox.capitalone.com', 
  port: 443, // https
  path: '/deposits/account-applications',
  headers: requestHeaders
}

// Create the request and handle the response
var createNewAccountApplication = https.request(options, function(response) {

  // Accumulate the response data
  var responseData = "";
  response.on('data', function(data) {
    responseData += data;
  });

  // Process the response data
  response.on('end', function() {
    // Do something with responseData
    console.log(responseData)
  });
});

// Write the request body into the request message
createNewAccountApplication.write(requestBody);

// Finish sending the request
createNewAccountApplication.end();


