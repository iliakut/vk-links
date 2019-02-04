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
    'arr': 0,
    'len': 0
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
      id_list.arr = response.response.items;
      id_list.len = response.response.count;

      // записать в файл
      fs.appendFileSync("data.txt", id_list.arr);
      fs.appendFileSync("data.txt", '\n');
      fs.appendFileSync("data.txt", id_list.len);
      fs.appendFileSync("data.txt", '\n');

      // пройтись по всему массиву id
      for (let i = 0; i < id_list.arr.length; i++) {
        let current_id = id_list.arr[i];
        // создадим для  каждого id свой обюъект
        id_list[current_id] = {};
        id_list[current_id]['arr'] = [];
        id_list[current_id]['len'] = 0;
        options.qs.user_id = current_id;
        // запрос для каждого id
        request_promise(options)
          .then((res) => {
            console.log('getting deep' + current_id);
            id_list[current_id].set = new Set(res.response.items);
            id_list[current_id].len = res.response.count;

            // записать в файл
            fs.appendFile("data.txt", current_id, function(error) {
              if(error) throw error;
              fs.appendFile("data.txt", '\n', function(error){
                if(error) throw error;
                fs.appendFile("data.txt", id_list[current_id].arr, function(error){
                  if(error) throw error;
                  fs.appendFile("data.txt", '\n', function(error){
                    if(error) throw error;
                    fs.appendFile("data.txt", id_list[current_id].len, function(error){
                      if(error) throw error;
                      fs.appendFile("data.txt", '\n', function(error){
                        if(error) throw error
                      });
                    });
                  });
                });
              });
            });
          })
          .catch((err) => {
            console.log(err);
          })
      }
      //res.send(resp); отправить на клиента
    })
    .catch((error) => {
      console.log(error);
    })

});
