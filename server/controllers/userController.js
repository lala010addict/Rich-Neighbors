// NOTE: createUser and loginUser are in the indexController
// var Team = require('../models/team');
var User = require('../models/user');
var Task = require('../models/task');
var Project = require('../models/project');
var Org = require('../models/org');


module.exports = {
  allUsers: function(req, res, next) {
    // send only _id and username
    User.find({}, '_id username', function(err, users) {
      if (err) return res.status(500).send();

      res.status(200).send(users);
    });
  },

  getLoggedInUser: function(req, res, next) {
    User.findById(req.user._id, {
      'password': false
    }, function(err, user) {
      if (err) return res.sendStatus(500, err);
      if (!user) return res.sendStatus(404, err);
      res.status(200).send(user);
    });
  },

  getUserById: function(req, res, next) {
    User.findById(req.params.id, {
      'password': false
    }, function(err, user) {
      if (err) return res.sendStatus(500, err);
      if (!user) return res.sendStatus(404, err);
      res.status(200).send(user);
    });
  },

  updateUser: function(req, res, next) {
    User.findOne({
      _id: req.body._id
    }, function(err, user) {

      if (err) return res.sendStatus(404, err);

      user.username = req.body.username;
      user.email = req.body.email;

      user.save(function(err, user) {
        if (err) console.log('err: ', err);
        if (err) return res.sendStatus(404, err);

        res.status(200).send(user);
      });
    });
  },

  removeUser: function(req, res, next) {
    var username = req.body.username.trim();
    var password = req.body.password.trim();
    User.findOne({
      username: username
    }, function(err, user) {
      if (!user) return res.status(401).send('Username does not exist');

      user.comparePassword(password, function(match) {
        if (!match) return res.status(401).send('Password does not match');

        user.remove();
        res.status(200).send(user);
      });
    });
  },

  
