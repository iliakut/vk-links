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

function promiseFactory(one_of_promise_all) {
  return request_promise(one_of_promise_all);
}
function isMutual(mutualArr, id) {
  return mutualArr.includes(id);
}
function findMutualFriends(friendsArrOfObj, id) {
  let mutualArr = [];
  for (let friendId in friendsArrOfObj) {
    if (friendsArrOfObj[friendId] !== "error") {
      if (friendsArrOfObj[friendId].ids_arr.includes(id)) {
        mutualArr.push(friendId);
      }
    }

  }
  return mutualArr;
}
/*app.get('/', (req, res) => {
  res.send('server ok');
  console.log(req);
});*/

app.post('/', function(req, res) {
  // check reseived information
  let id1 = req.body.id1;
  let id2 = req.body.id2;
  //let id1 = 17784637;
  //let id2 = 15278385;
  console.log(req.body);
  // создадим объект с результатом
  let id_list = {
    'ids_arr': 0,
    'len': 0,
    'fiends_obj': {}
  };
  // настройка запроса к VK-API
  let optionsGetFriends = {
    method: 'GET',
    uri: 'https://api.vk.com/method/friends.get?v=5.52&',
    qs: {
      access_token: access_token.my_token,
      user_id: '',
      order: 'hints'
    },
    json: true
  };
  let optionsGetUserInfo = {
    method: 'GET',
    uri: 'https://api.vk.com/method/users.get?v=5.89',
    qs: {
      access_token: access_token.my_token,
      user_ids: `${id1}, ${id2}`,
      fields: "photo_200, screen_name"
    },
    json: true
  };
  let result = {
    areMutual: false,
    mutualArr: [],
    avatars: {}
  };
  console.log('getting data from VK-API');

  // get data from vk-API
  // получим id пользователей
  request_promise(optionsGetUserInfo)
    .then((response) => {
      // преобразуем id в числа
      id1 = response.response[0].id - 0;
      id2 = response.response[1].id - 0;
      // восстановим запрос optionsGetUserInfo
      console.log(response);
      optionsGetUserInfo.qs.user_ids = `${id1}, ${id2}`;
      //
      optionsGetFriends.qs.user_id = id1;
      return request_promise(optionsGetFriends);
    })
    // первое рукопожатие
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
        const temp_options = JSON.parse(JSON.stringify(optionsGetFriends));
        // подменить id для запроса
        temp_options.qs.user_id = id_list.ids_arr[i];
        // добавить объект запроса в массив прописов
        promises_arr.push(request_promise(temp_options));
      }
      // вернуть список промисов для последующей обработки
      return promises_arr
    })
    // второе рукопожатие
    .then((promises_arr) => {
      // запустить все запросы (получить списки друзей людей из массива)
      return Promise.all(promises_arr);
    })
    // обработка второго рукопожатия и запрос третьего (пока не реализован запрос третьего)
    .then(promise_all_result => {
      console.log('getting deeper');
      let promises_all_arr_deeper = [];
      // составим результируюзий объект и заполним новый promise_all
      for (let i = 0; i < promise_all_result.length; i++) {
        // проверка на ошибку ответа
        if (promise_all_result[i].response !== undefined) {
          // добавим объект этого друга с его списком в массив
          let current_id = id_list.ids_arr[i];
          // arr для создания нескольких promise all
          let promises_all_temp_arr = [];
          id_list.fiends_obj[current_id] = {
            'ids_arr': promise_all_result[i].response.items,
            'len': promise_all_result[i].response.count,
            'fiends_obj': {}
          };
          // составим promise_all_deeper для третьего рукопожатия
          // так как делать 100 * 100 (в среднем) запросов на сервер выдает ошибку ENOBUFS
          for (let j = 0; j < 3; j++) {
            // склонировать исходник опции для запроса
            const temp_options = JSON.parse(JSON.stringify(optionsGetFriends));
            // подменить id для запроса
            temp_options.qs.user_id = promise_all_result[i].response.items[j];
            // добавить объект запроса в массив промисов
            promises_all_temp_arr.push(request_promise(temp_options));
          }
          // вернем все promise all в список из promise all (массив массивов)
          promises_all_arr_deeper.push(promises_all_temp_arr);
        } else {
          // если ошибка ответа (скрыт список друзей)
          let current_id = id_list.ids_arr[i];
          id_list.fiends_obj[current_id] = 'error'
        }
      }
      // запрос третьего рукопожатия
      /*async function get_all_promises_all() {
        let promise_all_result = [];
        let counter = 0;
        for (const promise_arr of promises_all_arr_deeper) {
          const result = await Promise.all(promise_arr);
          promise_all_result.push(result);
          counter++;
          //console.log(counter);
        }
        return promise_all_result;
      }
      (async () => {
        let data = await get_all_promises_all();
        fs.appendFile("data.json", JSON.stringify(data), (err) => {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });
        fs.appendFileSync("id_list.json", JSON.stringify(id_list));
      })();*/
      // обработка результатов
      fs.appendFileSync("id_list.json", JSON.stringify(id_list));
      // проверить если пользователи и так друзья
      result.areMutual = isMutual(id_list.ids_arr, id2);
      // проверить если пользователи имеют общих друзей
      result.mutualArr = findMutualFriends(id_list.fiends_obj, id2);
      // запишеп результат в файл
      fs.appendFileSync("result.json", JSON.stringify(result));

      // получим аватарки пользователей
      // заполним id для запроса
      optionsGetUserInfo.qs.user_ids += ',' + result.mutualArr;
      return request_promise(optionsGetUserInfo);
    })
    .then((getUserInfo_result) => {
      // обработка ответа с аватарками
      for (let user of getUserInfo_result.response) {
        result.avatars[user.id] = user.photo_200;
      }
    })
    .then(() => {
      res.send(result); // отправить клиенту
    })
    .catch((error) => {
      console.log(error);
    });
});
