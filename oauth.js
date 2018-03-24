const credentials = {
  client: {
    id: 'vgw3sf4f8nq3b98i1gdfr8wpx4gpty0ska52',
    secret: 'eb5f6rda6v0d1ld8y4fymkudo86gorrc47cj'
  },
  auth: {
    tokenHost: 'https://api.dxhackathon.com',
    tokenPath: '/oauth2/token'
  }
};
const oauth2 = require('simple-oauth2').create(credentials);
const tokenConfig = {};

function authenticate() {
  oauth2.clientCredentials
  .getToken(tokenConfig)
  .then((result) => {
    const accessToken = oauth2.accessToken.create(result);
    console.log('Access token: ');
    console.log(accessToken);
  })
  .catch((error) => {
    console.log('Access Token error: ', error.message);
  });
}

authenticate();

module.exports = {authenticate: authenticate};
