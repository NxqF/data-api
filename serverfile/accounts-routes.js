var express = require('express');

var app = module.exports = express.Router();

var Account = require('./accounts');

app.get('/accounts', function (req, res) {
  Account.find({}, function (err, todos) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }

    res.status(200).send({ "success": true, "result": todos });
  });
});

app.post('/accounts', function (req, res) {
  if (!req.body.name) {
    return res.status(400).send({ "success": false, "msg": "You need to send the text of the todo!" });
  }

  var newTodo = new Account({
    name: req.body.name,
    password: req.body.password,
    userName: req.body.userName = 'xqf',
    userId: req.body.userId,
    userImgUrl: req.body.userImgUrl = './assets/user.jpg',
    role: req.body.role = '5951c2b53afd231d8437173d',
  });

  newTodo.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Todo.' });
  });
});

app.delete('/accounts/:todoId', function (req, res) {
  var lectionId = req.params.todoId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Todo", "error": err });
  }

  Account.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting Todo", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "Todo deleted" });
  });
});