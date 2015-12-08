var mongoose = require('mongoose');
var Schema = mongoose.Schema;

if (process.env.MONGOLAB_URI) {
  mongoose.connect(process.env.MONGOLAB_URI);
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/richneighbortest');
} else {
  mongoose.connect('mongodb://localhost/richneighbor');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Users
var usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  organization: [{
    type: Schema.ObjectId,
    ref: 'Org'
  }],
  project_list: [{
    type: Schema.ObjectId,
    ref: 'Project'
  }],
  task_list: [{
    type: Schema.ObjectId,
    ref: 'Task'
  }]
});

db.usersSchema = usersSchema;

module.exports = db;
