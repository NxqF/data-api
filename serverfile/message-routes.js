var express = require('express');

var app = module.exports = express.Router();

var Message = require('./message');

app.get('/message', function (req, res) {
  Message.find({}, function (err, todos) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }

    res.status(200).send({ "success": true, "result": todos });
  });
});

app.post('/message', function (req, res) {
  if (!req.body.message) {
    return res.status(400).send({ "success": false, "msg": "You need to send the message of the todo!" });
  }

  var newTodo = new Message({
    message: req.body.message,
    userId: req.body.userId,
    userName: req.body.userName,
    userImgUrl: req.body.userImgUrl,
    toUserId: req.body.toUserId,
    toUserName: req.body.toUserName,
  });

  newTodo.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Todo.' });
  });
});

app.delete('/message/:todoId', function (req, res) {
  var lectionId = req.params.todoId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Todo", "error": err });
  }

  Message.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting Todo", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "Todo deleted" });
  });
});