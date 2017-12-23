var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Departments = require('../models/departments');

var departmentRouter = express.Router();
departmentRouter.use(bodyParser.json());

departmentRouter.route('/')
.get(function (req, res, next) {
    Departments.find(req.query)
        .populate('messages.postedBy')
        .exec(function (err, department) {
        if (err) next(err);
        res.json(department);
    });
})

.post(function (req, res, next) {
    Departments.create(req.body, function (err, department) {
        if (err) return next(err);
        console.log('Department created!');
        var id = department._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the department with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Departments.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

departmentRouter.route('/:departmentId')
.get(function (req, res, next) {
    Departments.findById(req.params.departmentId, function (err, department) {
        if (err) return next(err);
        res.json(department);
    });
})

.put(function (req, res, next) {
    Department.findByIdAndUpdate(req.params.departmentId, {
        $set: req.body
    }, {
        new: true
    }, function (err, department) {
        if (err) return next(err);
        res.json(department);
    });
})

.delete(function (req, res, next) {
    Departments.findByIdAndRemove(req.params.departmentId, function (err, resp) {        
    if (err) return next(err);
        res.json(resp);
    });
});