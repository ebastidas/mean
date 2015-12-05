'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  path = require('path'),
  User = require(path.resolve('modules/users/server/models/user.server.model.js')).init(),
  Schema = mongoose.Schema;

var model = {
  schema: getSchema,
  init: initModel
};

module.exports = model;

/**
 * Initialize Article Model
 */
function initModel (schema) {
  console.log('***** HEY I GOT HERE *********');
  schema = schema || getSchema();

  return getModelOrCreate(schema);
}

function getModelOrCreate (schema) {
  try {
    return mongoose.model('Article');    
  } catch (e) {
    mongoose.model('Article', schema);
    return mongoose.model('Article');
  }
}

/**
 * Article Schema
 */
function getSchema () {

  var schema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    title: {
      type: String,
      default: '',
      trim: true,
      required: 'Title cannot be blank'
    },
    content: {
      type: String,
      default: '',
      trim: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  });

  return schema;
}
