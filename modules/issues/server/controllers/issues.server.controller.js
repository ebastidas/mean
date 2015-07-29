'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Issue = mongoose.model('Issue'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a issue
 */
exports.create = function (req, res) {
    var issue = new Issue(req.body);
    issue.user = req.user;
    
    issue.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(issue);
        }
    });
};

/**
 * Show the current issue
 */
exports.read = function (req, res) {
    res.json(req.issue);
};

/**
 * Update a issue
 */
exports.update = function (req, res) {
    var issue = req.issue;
    
    issue.title = req.body.title;
    issue.description = req.body.description;
    issue.modified = Date.now();

    issue.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(issue);
        }
    });
};

/**
 * Delete an issue
 */
exports.delete = function (req, res) {
    var issue = req.issue;
    
    issue.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(issue);
        }
    });
};

/**
 * List of Issues
 */
exports.list = function (req, res) {
    var query = {};
    
    // figure out what Issues to list based on user's roles
    if (req.user.roles.indexOf('admin') !== -1) {
        // allow user's with the 'admin' role to view all Issues
        query = Issue.find();
    } else {
        // only retrieve Issues that the user "owns"
        query = Issue.find({ user: { _id: req.user.id } });
    }
    
    // execute query to get list of Issues
    query.sort('-created').populate('user', 'displayName').exec(function (err, issues) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(issues);
        }
    });
};

/**
 * Issue middleware
 */
exports.issueByID = function (req, res, next, id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Issue is invalid'
        });
    }
    
    Issue.findById(id).populate('user', 'displayName').exec(function (err, issue) {
        if (err) return next(err);
        if (!issue) {
            return res.status(404).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        req.issue = issue;
        next();
    });
};
