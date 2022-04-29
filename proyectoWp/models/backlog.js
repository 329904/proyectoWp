var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _name: String,
  _cards: [{
    type: mongoose.ObjectId,
    ref: 'Card'
  }],
  _burndown: [Number]
});

class Backlog {

  constructor(name, burndown, cards) {
    this._name = name;
    this._burndown = burndown;
    this._cards = cards;
  }

  // ----------------------------------------------------------
  // SETTERS
  // ----------------------------------------------------------

  set name(v) {
    this._name = v;
  }

  set cards(v) {
    this._cards = v;
  }

  set burndown(v) {
    this._burndown = v;
  }

  // ----------------------------------------------------------
  // GETTERS
  // ----------------------------------------------------------

  get name() {
    return this._name;
  }

  get cards() {
    return this._cards;
  }

  get burndown() {
    return this._burndown;
  }

  // TODO: calcRemaining() and  calcSpeed()

}

schema.loadClass(Backlog);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Backlog', schema);
