const CouchsurfingAPI = require('./CSApi');

let CouchsurfingApiInstance;

module.exports = {
  login: async function login(req, res) {
    const { username, password } = req.body;

    CouchsurfingApiInstance = new CouchsurfingAPI(username, password);
    await CouchsurfingApiInstance._login();

    res.send({ message: 'user successfully logged in' });
  },

  getSelfProfile: async function getSelfProfile(req, res) {
    const data = await CouchsurfingApiInstance.getSelfProfile();

    res.send({ data });
  }
};
