var api = {
  addUser(inputUsername, inputPassword){
    password = inputPassword;
    var url = `https://amber-torch-3121.firebaseio.com/${inputUsername}.json`;
    return fetch(url, {
      method: 'put',
      body: JSON.stringify({
        info:{
              password: password,
            }
      })
    }).then((res) => res.json());
  },

  checkUser(inputUsername){
    return fetch(`https://amber-torch-3121.firebaseio.com/${inputUsername}.json`).then((res) => res.json());
  },

  addTrip(inputUsername, trip){
    var url = `https://amber-torch-3121.firebaseio.com/${inputUsername}/trips.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(trip)
    }).then((res)=> res.json());
  },

  getTrips(inputUsername){
    return fetch(`https://amber-torch-3121.firebaseio.com/${inputUsername}/trips.json`).then((res)=> res.json());
  },
};

module.exports = api;