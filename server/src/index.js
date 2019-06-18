const access_token = require('./access_token');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const request_promise = require('request-promise');
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
  //let id1 = req.body.id;
  res.send('server ok');
  // для теста зададим статичный id
  let id1 = 17784637;
  let id2 = 226349;
  let result = [];
  console.log(req.body);
  // создадим объект с результатом
  let id_list = {
    'ids_arr': 0,
    'len': 0,
    'fiends_obj': {}
  };
  // настройка запроса к VK-API
  let options = {
    method: 'GET',
    uri: 'https://api.vk.com/method/friends.get?v=5.52&',
    qs: {
      access_token: access_token.my_token,
      user_id: id1,
      order: 'hints'
    },
    json: true
  };
  console.log('getting data from VK-API');

  // get data from vk-API
  request_promise(options)
    .then((response) => {
      // сложим ответ в объект
      // список друзей
      id_list.ids_arr = response.response.items;
      // длина списка друзей
      id_list.len = response.response.count;

      // пройтись по всему массиву id (списку друзей) дла составления массива promises
      let promises_arr = [];

      for (let i = 0; i < id_list.ids_arr.length; i++) {
        // склонировать исходник опция для запроса
        const temp_options = JSON.parse(JSON.stringify(options));
        // подменить id для запроса
        temp_options.qs.user_id = id_list.ids_arr[i];
        // добавить объект запроса в массив прописов
        promises_arr.push(request_promise(temp_options));
      }
      // вернуть список промисов для последующей обработки
      return promises_arr
    })
    .then((promises_arr) => {
      // запустить все запросы (получить списки друзей людей из массива)
      return Promise.all(promises_arr);
    })
    .then(promise_all_result => {
          console.log('getting deeper');
          let promises_arr_deeper = [];
          // составим результируюзий объект и заполним новый promise_all
          for (let i = 0; i < promise_all_result.length; i++) {
            // проверка на ошибку ответа
            if (promise_all_result[i].response !== undefined) {
              // добавим объект этого друга с его списком в массив
              let current_id = id_list.ids_arr[i];
              id_list.fiends_obj[current_id] = {
                'ids_arr': promise_all_result[i].response.items,
                'len': promise_all_result[i].response.count,
                'fiends_obj': {}
              };
              // составим promise_all
              //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              for (let j = 0; j < id_list.ids_arr.length; j++) {
                // склонировать исходник опция для запроса
                const temp_options = JSON.parse(JSON.stringify(options));
                // подменить id для запроса
                temp_options.qs.user_id = id_list.ids_arr[j];
                // добавить объект запроса в массив прописов
                promises_arr_deeper.push(request_promise(temp_options));
              }
            } else {
              // если ошибка ответа (скрыт список друзей)
              let current_id = id_list.ids_arr[i];
              id_list.fiends_obj[current_id] = 'error'
            }
          }
          // запишем в файл (для теста)
          fs.appendFileSync("data.json", JSON.stringify(id_list));

        })
    .catch((error) => {
      console.log(error);
    });

  //res.send(resp); отправить на клиента
});
/*
         // обработаем полученный итоговый список (id_list) на совпадения с id2
          // если id2 и так есть в списке друзей пользователя id1
          for (let i = 0; i <= id_list.ids_arr.length; i++) {
            if (id_list.ids_arr[i] === id2) {
              result.push([id_list.ids_arr[i]]);
            }
          }
          // если второе рукопожатие
          for (let i = 0; i <= Object.keys(id_list.fiends_obj).length; i++) {}
*/
