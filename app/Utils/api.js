var api = {
  addUser(inputUsername, inputEmail, inputPassword){
    email = inputEmail;
    password = inputPassword;
    var url = `https://amber-torch-3121.firebaseio.com/${inputUsername}.json`;
    return fetch(url, {
      method: 'put',
      body: JSON.stringify({
        user:{
              email: email,
              password: password,
            }
      })
    }).then((res) => res.json());
  },

  checkUser(inputUsername){
    return fetch(`https://amber-torch-3121.firebaseio.com/${inputUsername}.json`).then((res) => res.json());
  }
};

module.exports = api;