const mutuality = {};
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
}

exports.mutuality = mutuality;
