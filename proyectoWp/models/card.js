var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _name: String,
  _priority: Number,
  _size: Number,
});

class Card {
  constructor(name, priority, size) {
    this._name = name;
    this._priority = priority;
    this._size = size;
  }

// ----------------------------------------------------------
// SETTERS
// ----------------------------------------------------------

  set name(v) {
    this._name = v;
  }

  set size(v) {
    this._size = v;
  }

  set priority(v) {
    this._priority = v;
  }

// ----------------------------------------------------------
// GETTERS
// ----------------------------------------------------------

  get name() {
    return this._name;
  }

  get priority() {
    return this._priority;
  }
  get size() {
    return this._size;
  }
}

schema.loadClass(Card);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Card', schema);
