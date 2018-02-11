var express = require('express');
var router = express.Router();
var db = require("../database.js");

/* GET all users listing. */
router.get('/', function(req, res, next) {
	db.User.find().exec(function (err, response) {
		res.send(response);
	})
});

/* GET User info by id */
router.get('/:id', function(req, res, next) {
	db.User.findOne({_id: req.params.id}).exec(function (err, response) {
		res.send(response);
	})
});

/* Create new user. */
router.post('/add', function(req, res, next) {
	var user = new db.User({
		name: req.body.name,
		email: req.body.email
	});

	user.save(function (saveResult) {
		console.log(saveResult);
		res.status(204).send("");
	});
});

/* Update user info */
router.put('/update', function(req, res, next) {
	
	var data = {
		name: req.body.name,
		email: req.body.email
	};

	db.User.findOneAndUpdate({"_id": req.body.id}, data, {new: true}, function (err, updateResult) {
		console.log(updateResult);
		res.status(200).send(updateResult);
	});
});

/* Delete user by id */
router.delete('/:id', function(req, res, next) {
	
	console.log(req.params.id);
	
	db.User.remove({"_id": req.params.id}, function (err, deleteResults) {
		console.log(deleteResults);
		res.status(204).send("");
	});
});

module.exports = router;