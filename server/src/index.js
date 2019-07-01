// config
const access_token = require('./config/access_token');
const express = require('express');
// standart modules
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const request_promise = require('request-promise');
const fs = require("fs");
const app = express();
// my Methods
const myMethods = require('./myMethods');
// my Properties
const myProperties = require('./myProperties');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`));

app.post('/', function(req, res) {
  let properties = myProperties.properties(req);
  let options = myProperties.options(access_token.my_token, properties.id1, properties.id2);
  console.log('getting data from VK-API - запрос ID пользователей');
  // получим id пользователей
  request_promise(options.optionsGetUserInfo)
    .then((response) => {
      // преобразуем id в числа
      properties.id1 = myMethods.convertResponce.getFirstId_typeNumber(response);
      properties.id2 = myMethods.convertResponce.getSecondId_typeNumber(response);
      // заберем screen_names
      properties.first_user_screenName = myMethods.convertResponce.getFirstScreen_Name(response);
      properties.second_user_screenName = myMethods.convertResponce.getSecondScreen_Name(response);
      // восстановим запрос optionsGetUserInfo
      options.optionsGetUserInfo.qs.user_ids = `${properties.id1}, ${properties.id2}`;
      // запишем числовой id в запрос
      options.optionsGetFriends.qs.user_id = properties.id1;
      console.log('Promise all - первое рукопожатие');
      return request_promise(options.optionsGetFriends);
    })
    // первое рукопожатие
    .then((response) => {
      // сложим ответ в объект
      // список друзей
      properties.id_list.ids_arr = response.response.items;
      // длина списка друзей
      properties.id_list.len = response.response.count;
      // пройтись по всему массиву id (списку друзей) дла составления массива promises
      console.log('Promise all - запрос второго');
      return Promise.all(myMethods.formRequests.getPromises_arr(properties.id_list, options.optionsGetFriends, request_promise));
    })
    // обработка второго рукопожатия и запрос третьего (пока не реализован запрос третьего)
    .then(promise_all_result => {
      console.log('getting deeper - обработка второго рукопожатия');
      // составим результируюзий объект
      properties.id_list.fiends_obj = myMethods.convertResponce.formResultObj(promise_all_result, properties.id_list);
      // проверить если пользователи и так друзья
      properties.result.areMutual = myMethods.mutuality.isMutual(properties.id_list.ids_arr, properties.id2);
      // проверить если пользователи имеют общих друзей
      properties.result.mutualArr = myMethods.mutuality.findMutualFriends(properties.id_list.fiends_obj, properties.id2);
      // получим аватарки пользователей
      // заполним id для запроса
      options.optionsGetUserInfo.qs.user_ids += ',' + properties.result.mutualArr;
      return request_promise(options.optionsGetUserInfo);
    })
    .then((getUserInfo_result) => {
      console.log('запрос аватарок');
      // обработка ответа с аватарками
      properties.result.avatars = myMethods.convertResponce.getAvatars(getUserInfo_result, properties.first_user_screenName, properties.second_user_screenName);
    })
    .then(() => {
      console.log('Отправка данных на фронт');
      res.send(properties.result); // отправить клиенту
    })
    .catch((error) => {
      console.log(error);
    });
});
