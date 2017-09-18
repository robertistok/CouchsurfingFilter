const crypto = require('crypto');
const utf8 = require('utf8');
const axios = require('axios');

const CS_URL = 'https://hapi.couchsurfing.com';
const PRIVATE_KEY = 'v3#!R3v44y3ZsJykkb$E@CG#XreXeGCh';

class CouchsurfingAPI {
  constructor(username, password, userID, accessToken) {
    this.loggedIn = false;

    if (username === undefined || password === undefined) {
      throw new Error('Username and password should not be undefined');
    }

    this.password = password;
    this.username = username;

    if (userID !== undefined && accessToken !== undefined) {
      this.userID = userID;
      this.accessToken = accessToken;
    }
  }

  static _getUrlSignature(secretKey, msg) {
    return crypto
      .createHmac('sha1', utf8.encode(secretKey))
      .update(utf8.encode(msg))
      .digest('hex');
  }

  async _login() {
    if (this.loggedIn !== true) {
      const loginPayload = {
        actionType: 'manual_login',
        credentials: { authToken: this.password, email: this.username }
      };

      const signature = CouchsurfingAPI._getUrlSignature(
        PRIVATE_KEY,
        '/api/v3/sessions' + JSON.stringify(loginPayload)
      );

      this.headers = {
        Accept: 'application/json',
        'X-CS-Url-Signature': signature,
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en;q=1',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent':
          'Dalvik/2.1.0 (Linux; U; Android 5.0.1; Android SDK built for x86 Build/LSX66B) Couchsurfing/android/20141121013910661/Couchsurfing/3.0.1/ee6a1da'
      };

      const loginRes = await axios({
        method: 'post',
        url: `${CS_URL}/api/v3/sessions`,
        data: JSON.stringify(loginPayload),
        headers: this.headers
      });

      const { sessionUser } = loginRes.data;

      this.userID = sessionUser.id;
      this.accessToken = sessionUser.accessToken;
      this.loggedIn = true;
    } else {
      throw new Error('User already logged in');
    }
  }

  async apiRequest(path) {
    const signature = CouchsurfingAPI._getUrlSignature(
      `${PRIVATE_KEY}.${this.userID}`,
      path
    );

    this.headers = Object.assign({}, this.headers, {
      'X-CS-Url-Signature': signature,
      'X-Access-Token': this.accessToken
    });

    const dataResponse = await axios({
      method: 'get',
      url: `${CS_URL}${path}`,
      headers: this.headers
    });

    return dataResponse.data;
  }

  getSelfProfile() {
    const path = `/api/v3/users/${this.userID}`;

    return this.apiRequest(path);
  }

  getProfileById(userID) {
    const path = `/api/v3/users/${userID}`;

    return this.apiRequest(path);
  }

  getReferences(userID = this.userID, type = 'other_and_friend') {
    const path = `/api/v3/users/${userID}/references?perPage=999999&relationshipType=${type}&includeReferenceMeta=true`;

    return this.apiRequest(path);
  }
}

async function test() {
  const API = new CouchsurfingAPI('nzoakhvi@sharklasers.com', 'qwerty');
  await API._login();
}

module.exports = CouchsurfingAPI;
