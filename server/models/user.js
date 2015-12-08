var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');


db.usersSchema.pre('save', function(next, done) {
    var that = this;
    bcrypt.hash(this.password, null, null, function(err, hash) {
      that.password = hash;
      next();
    });
});

//TODO: Below commented out snippet needs to be removed or editted

// db.usersSchema.pre('init', function(next, data) {
//   User.populate(data, {
//     path: 'organization project_list task_list'
//   }, function(err, user) {
//     data = user;
//     next();
//   });
// });

var User = mongoose.model('User', db.usersSchema);


User.prototype.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
        callback(isMatch);
    });
};

module.exports = User;
