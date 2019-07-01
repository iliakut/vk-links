function properties(req) {
  let tempObj = {};
  tempObj.id1 = req.body.id1;
  tempObj.id2 = req.body.id2;
  tempObj.first_user_screenName = '';
  tempObj.second_user_screenName = '';
  // создадим объект с результатом
  tempObj.id_list = {
    'ids_arr': 0,
    'len': 0,
    'fiends_obj': {}
  };
  tempObj.result = {
    areMutual: false,
    mutualArr: [],
    avatars: {}
  };
  return tempObj
}

function options(access_token, id1, id2) {
  if (typeof(access_token) !== "string") throw new Error("access_token must be a String");
  // настройка запроса к VK-API
  let optionsGetFriends = {
    method: 'GET',
    uri: 'https://api.vk.com/method/friends.get?v=5.52&',
    qs: {
      access_token: access_token,
      user_id: '',
      order: 'hints'
    },
    json: true
  };
  let optionsGetUserInfo = {
    method: 'GET',
    uri: 'https://api.vk.com/method/users.get?v=5.89',
    qs: {
      access_token: access_token,
      user_ids: `${id1}, ${id2}`,
      fields: "photo_200, screen_name"
    },
    json: true
  };
  return { optionsGetFriends: optionsGetFriends,
    optionsGetUserInfo: optionsGetUserInfo
  }
}

exports.properties = properties;
exports.options = options;
