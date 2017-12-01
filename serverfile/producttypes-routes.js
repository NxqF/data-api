var express = require('express');

var app = module.exports = express.Router();

var ProductType = require('./producttypes');

app.get('/producttypes', function (req, res) {
  ProductType.find({}, function (err, todos) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }

    res.status(200).send({ "success": true, "result": todos });
  });
});

app.post('/producttypes', function (req, res) {
  if (!req.body.name) {
    return res.status(400).send({ "success": false, "msg": "You need to send the text of the todo!" });
  }

  var newTodo = new ProductType({
    name: req.body.name,
    itemTypeId: req.body.itemTypeId
  });

  newTodo.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Todo.' });
  });
});

app.delete('/producttypes/:todoId', function (req, res) {
  var lectionId = req.params.todoId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Todo", "error": err });
  }

  ProductType.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting Todo", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "Todo deleted" });
  });
});