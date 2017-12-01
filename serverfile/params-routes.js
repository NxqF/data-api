var express = require('express');

var app = module.exports = express.Router();

var Param = require('./params');

app.get('/params', function (req, res) {
  Param.find({}, function (err, todos) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }

    res.status(200).send({ "success": true, "result": todos });
  });
});

app.post('/params', function (req, res) {
  if (!req.body.name) {
    return res.status(400).send({ "success": false, "msg": "You need to send the text of the todo!" });
  }

  var newTodo = new Param({
    name: req.body.name,
    productTypesId: req.body.productTypesId,
    params: req.body.params
  });

  newTodo.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Todo", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Todo.' });
  });
});

app.delete('/params/:todoId', function (req, res) {
  var lectionId = req.params.todoId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Todo", "error": err });
  }

  Param.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting Todo", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "Todo deleted" });
  });
});