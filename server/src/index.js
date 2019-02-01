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
      id_list.set = new Set(response.response.items);
      id_list.len = response.response.count;

      id_list.set.forEach((current_id) => {
        id_list[current_id] = {};
        id_list[current_id]['set'] = 0;
        id_list[current_id]['len'] = 0;
        options.qs.user_id = current_id;

          request_promise(options)
            'https://ru.stackoverflow.com/questions/433887/%D0%9F%D0%BE%D1%87%D0%B5%D0%BC%D1%83-%D0%B0%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F-%D0%B2%D0%BD%D1%83%D1%82%D1%80%D0%B8-%D1%86%D0%B8%D0%BA%D0%BB%D0%B0-%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D1%8F%D0%B5%D1%82-%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D1%8E%D1%8E-%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D1%8E-%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE-%D1%80%D0%B0%D0%B7'
            .then((res) => {
              console.log('getting deep' + current_id);
              console.log(res);
              id_list[current_id].set = new Set(res.response.items);
              id_list[current_id].len = res.response.count;
            })
            .catch((err) => {
              console.log(err);
            })
      });


      fs.writeFileSync("data.txt", JSON.stringify(Array.from(id_list.set)));
      fs.appendFileSync("data.txt", '\n \n');
      Object.keys(id_list).forEach((val) => {
        fs.appendFileSync("data.txt",JSON.stringify(val));
        fs.appendFileSync("data.txt", '\n');
        fs.appendFileSync("data.txt",JSON.stringify(id_list[val]));
        fs.appendFileSync("data.txt", '\n');
        if (val !== 'set' && val !== 'len') {
          Object.keys(id_list[val]).forEach((elem) => {
            fs.appendFileSync("data.txt",JSON.stringify(elem));
            fs.appendFileSync("data.txt", '\n');
            fs.appendFileSync("data.txt",JSON.stringify(id_list[val][elem]));
            fs.appendFileSync("data.txt", '\n');
          })
        }
      });
      //res.send(resp); отправить на клиента
    })
    .catch((error) => {
      console.log(error);
    })

});
