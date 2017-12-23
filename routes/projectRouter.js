var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Projects = require('../models/projects');

var projectRouter = express.Router();
projectRouter.use(bodyParser.json());

projectRouter.route('/')
.get(function (req, res, next) {
    Projects.find(req.query)
        .populate('messages.postedBy')
        .exec(function (err, project) {
        if (err) next(err);
        res.json(project);
    });
})

.post(function (req, res, next) {
    Projects.create(req.body, function (err, project) {
        if (err) return next(err);
        console.log('Project created!');
        var id = project._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the project with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Projects.remove({}, function (err, resp) {
        if (err) return next(err);
        res.json(resp);
    });
});

projectRouter.route('/:projectId')
.get(function (req, res, next) {
    Projects.findById(req.params.projectId, function (err, project) {
        if (err) return next(err);
        res.json(project);
    });
})

.put(function (req, res, next) {
    Project.findByIdAndUpdate(req.params.projectId, {
        $set: req.body
    }, {
        new: true
    }, function (err, project) {
        if (err) return next(err);
        res.json(project);
    });
})

.delete(function (req, res, next) {
    Projects.findByIdAndRemove(req.params.projectId, function (err, resp) {        
    if (err) return next(err);
        res.json(resp);
    });
});