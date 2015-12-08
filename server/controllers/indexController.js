var jwt = require('jwt-simple');
// var Team = require('../models/team');
var User = require('../models/user');


var sendJWT = function(user, res) {
  var token = jwt.encode(user, 'secret');
  res.json({
    token: token
  });
};


module.exports = {
  createUser: function(req, res, next) {

    var username = req.body.username.trim();
    var password = req.body.password.trim();
    if (username === '' || password === '') {
      return res.status(400).send('Username and Password must be present');
    }

    User.findOne({
      username: username
    }, function(err, user) {
      if (user) return res.status(400).send('Username exists');
      var newUser = new User({
        username: username,
        password: password
      });

      newUser.save(function(err, newUser) {
        if (err) return res.status(404).send(err);

        res.status(201);
        sendJWT(newUser, res);

      });
    });
  },
  getIndex: function(req, res, next) {
    res.render('index', {
      title: 'Express'
    });
  },
  loginUser: function(req, res, next) {
    var username = req.body.username.trim();
    var password = req.body.password.trim();
    if (username === '' || password === '') {
      return res.status(400).send('Username, Password, and Teamname must be present');
    }

    User.findOne({
      username: username
    }, function(err, user) {
      if (!user) return res.status(401).send('Username does not exist');

      user.comparePassword(password, function(match) {
        if (!match) return res.status(401).send('Password does not match');

        sendJWT(user, res);
      });
    });

  }
};
