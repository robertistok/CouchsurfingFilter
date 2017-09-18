const express = require('express');

const Controller = require('./controller');

const router = express.Router();

const apiURL = '/csfilter/api';

router.get(apiURL, (req, res) => res.send('hello world'));

router.post(`${apiURL}/login`, Controller.login);
router.get(`${apiURL}/self`, Controller.getSelfProfile);

module.exports = router;
