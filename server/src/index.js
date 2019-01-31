const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const request_promise = require('request-promise')
const fs = require("fs");
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`));

/*app.get('/', (req, res) => {
  res.send('server ok');
  console.log(req);
});*/

app.post('/', function(req, res) {
  // check reseived information
  let id1 = req.body.id;
  let id_list = {
    'set': 0,
    'len': 0,
    'id': 0
  };
  let options = {
    method: 'GET',
    uri: 'https://api.vk.com/method/friends.get?v=5.52&',
    qs: {
      access_token: 'b07354b5b07354b5b07354b5d8b01b4b52bb073b07354b5ec32f7b936771553438e7f17',
      user_id: id1,
      order: 'hints'
    },
    json: true
  };

  console.log('getting data from VK-API');
  // get data from vk-API
  request_promise(options)
    .then(function (response) {
      let resp = response;

      id_list.set = new Set(resp.response.items);
      id_list.len = resp.response.count;

      id_list.set.forEach(
////?????????????????????????
      );

      fs.writeFileSync("data.txt", JSON.stringify(Array.from(id_list.set)));
      //res.send(resp); отправить на клиента
    })
    .catch(function (err) {
      console.log(err);
    })

});
