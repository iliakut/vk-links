const mutuality = {};
const convertResponce = {};
const formRequests = {};
mutuality.isMutual = function(mutualArr, id) {
  return mutualArr.includes(id);
};
mutuality.findMutualFriends = function(friendsArrOfObj, id) {
  let mutualArr = [];
  for (let friendId in friendsArrOfObj) {
    if (friendsArrOfObj[friendId] !== "error") {
      if (friendsArrOfObj[friendId].ids_arr.includes(id)) {
        mutualArr.push(friendId);
      }
    }

  }
  return mutualArr;
};
convertResponce.getFirstId_typeNumber = function (response) {
  return response.response[0].id - 0;
};
convertResponce.getSecondId_typeNumber = function (response) {
  return response.response[1].id - 0;
};
convertResponce.getFirstScreen_Name = function (response) {
  return response.response[0].screen_name;
};
convertResponce.getSecondScreen_Name = function (response) {
  return response.response[1].screen_name;
};
convertResponce.formResultObj = function(promise_all_result, id_list) {
  let id_list_friendsObj = {};
  for (let i = 0; i < promise_all_result.length; i++) {
    // проверка на ошибку ответа
    if (promise_all_result[i].response !== undefined) {
      // добавим объект этого друга с его списком в массив
      let current_id = id_list.ids_arr[i];
      // arr для создания нескольких promise all
      let promises_all_temp_arr = [];
      id_list_friendsObj[current_id] = {
        'ids_arr': promise_all_result[i].response.items,
        'len': promise_all_result[i].response.count,
        'fiends_obj': {}
      };
/*      // составим promise_all_deeper для третьего рукопожатия
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
      promises_all_arr_deeper.push(promises_all_temp_arr);*/
    } else {
      // если ошибка ответа (скрыт список друзей)
      let current_id = id_list.ids_arr[i];
      id_list_friendsObj[current_id] = 'error'
    }
  }
  return id_list_friendsObj;
};
convertResponce.getAvatars = function(getUserInfo_result, first_user_screenName, second_user_screenName) {
  let avatars = {};
  for (let user of getUserInfo_result.response) {
    avatars[user.id] = user.photo_200;
    if (user.screen_name === first_user_screenName) {
      avatars["first_user"] = user.photo_200;
    }
    if (user.screen_name === second_user_screenName) {
      avatars["second_user"] = user.photo_200;
    }
  }
  return avatars;
};
formRequests.getPromises_arr = function(id_list, optionsGetFriends, request_promise) {
  let promises_arr = [];
  for (let i = 0; i < id_list.ids_arr.length; i++) {
    // склонировать исходник опция для запроса
    const temp_options = JSON.parse(JSON.stringify(optionsGetFriends));
    // подменить id для запроса
    temp_options.qs.user_id = id_list.ids_arr[i];
    // добавить объект запроса в массив прописов
    promises_arr.push(request_promise(temp_options));
  }
  return promises_arr;
};
formRequests.getThirdHandPromiseAll = function() {
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
}
exports.mutuality = mutuality;
exports.convertResponce = convertResponce;
exports.formRequests = formRequests;
