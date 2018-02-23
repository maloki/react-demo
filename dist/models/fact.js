'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var schemaOptions = {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
};

var schema = new Schema({
  text: String,
  category: String,
  tags: [String],
  dateCreated: { type: Date, default: Date.now() },
  img: String
}, schemaOptions);

var model = _mongoose2.default.model('Fact', schema);

exports.default = model;