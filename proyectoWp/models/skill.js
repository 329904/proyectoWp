var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _name: String,
  _rank: {
    type: String,
    enum: ['JUNIOR', 'SENIOR', 'MASTER'],
    default: 'JUNIOR',
  },
});

class Skill {
  constructor(name, rank) {
    this._name = name;
    this._rank = rank;
  }

  // -----------------------------------------------
  // SETTERS
  // -----------------------------------------------

  set name(v) {
    this._name = v;
  }

  set rank(v) {
    this._rank = v;
  }

  // -----------------------------------------------
  // GETTERS
  // -----------------------------------------------

  get name() {
    return this._name;
  }

  get rank() {
    return this._rank;
  }
}

schema.loadClass(Skill);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Skill', schema);
