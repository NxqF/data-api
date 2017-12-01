var express = require('express');

var app = module.exports = express.Router();

var ShopList = require('./shoplist');

app.get('/shoplist', function (req, res) {
  ShopList.find({}, function (err, todos) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }

    res.status(200).send({ "success": true, "result": todos });
  });
});

app.post('/shoplist', function (req, res) {
  if (!req.body.userId) {
    return res.status(400).send({ "success": false, "msg": "You need to send the userId of the todo!" });
  }

  var newTodo = new ShopList({
    userId: req.body.userId,
    shoplist: req.body.shoplist,
    totalprice: req.body.totalprice
  });

  newTodo.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Todo.' });
  });
});

app.delete('/shoplist/:todoId', function (req, res) {
  var lectionId = req.params.todoId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Todo", "error": err });
  }

  ShopList.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting Todo", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "Todo deleted" });
  });
});