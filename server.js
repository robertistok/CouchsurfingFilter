const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.set('port', process.env.PORT || 3010);

const server = app.listen(app.get('port'), () => {
  console.log(`The app is listening on port ${app.get('port')}`);
});
