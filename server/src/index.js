const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const request_promise = require('request-promise')

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`));

let test = '10';
let db = {};

app.get('/', (req, res) => {
  res.send(test);
  console.log(req);
});


app.post('/', function(req, res) {
  // check reseived information
  let id = req.body.id;
  console.log(id);
  // get API options
  const options = {
    method: 'GET',
    uri: 'https://api.vk.com/method/friends.get?v=5.52&',
    qs: {
      access_token: 'b07354b5b07354b5b07354b5d8b01b4b52bb073b07354b5ec32f7b936771553438e7f17',
      user_id: id,
      order: 'hints'
    },
    json: true
  };
  // get data from vk-API
  request_promise(options)
    .then(function (response) {
      let resp = response;
      console.log(resp);
      res.send(resp);
    })
    .catch(function (err) {
      console.log(err);
    })


});
