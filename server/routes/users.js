var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

// List all Users
router.get('/all', userController.allUsers);

// Get logged in user
router.get('/', userController.getLoggedInUser);

// Get User by Id
router.get('/:id', userController.getUserById);

// Update User
router.put('/', userController.updateUser);

// curl -H "Content-Type: application/json" -X POST -d '{"username":"testuser", "password":"testpass", "teamname":"my team"}' http://localhost:3000/api/users/destroy
router.post('/remove', userController.removeUser);

module.exports = router;
