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
    'ids_arr': 0,
    'len': 0,
    'fiends_obj': {}
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
    .then((response) => {
      id_list.ids_arr = response.response.items;
      id_list.len = response.response.count;

      // пройтись по всему массиву id дла составления массива promises
      let promises_arr = [];
      for (let i = 0; i < id_list.ids_arr.length; i++) {
        const temp_options = JSON.parse(JSON.stringify(options));
        temp_options.qs.user_id = id_list.ids_arr[i];
        promises_arr.push(request_promise(temp_options));
      }
      return promises_arr
    })
    .then((promises_arr) => {
      Promise.all(promises_arr)
        .then(values => {
          console.log('getting deeper');

          for (let i = 0; i < values.length; i++) {
            // проверка на ошибку ответа
            if (values[i].response !== undefined) {
              let current_id = id_list.ids_arr[i];
              id_list.fiends_obj[current_id] = {
                'ids_arr': values[i].response.items,
                'len': values[i].response.count,
                'fiends_obj': {}
              }
            } else {
              let current_id = id_list.ids_arr[i];
              id_list.fiends_obj[current_id] = 'error'
            }
          }
          fs.appendFileSync("data.json", JSON.stringify(id_list));
        })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((error) => {
      console.log(error);
    });

  //res.send(resp); отправить на клиента
});
