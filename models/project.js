var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _name: String,
  _startDate: String,
  _endDate: String,
  _description: String,
  _board: {
    type: mongoose.ObjectId,
    ref: 'ScrumBoard'
  },
  _productOwner: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  _scrumMaster: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  _team: [{
    type: mongoose.ObjectId,
    ref: 'User'
  }],
});

class Project {
  constructor(name, startDate, endDate, description, productOwner,
    scrumMaster, team, board) {
      this._name = name;
      this._startDate = startDate;
      this._endDate = endDate;
      this._description = description;
      this._productOwner = productOwner;
      this._scrumMaster = scrumMaster;
      this._team = team;
      this._board = board;
    }

  // --------------------------------------------------------------
  // SETTERS
  // --------------------------------------------------------------

  set name(v) {
    this._name = v;
  }

  set requestDate(v) {
    this._requestDate = v;
  }

  set startDate(v) {
    this._startDate = v;
  }

  set endDate(v) {
    this._endDate = v;
  }

  set description(v) {
    this._description = v;
  }

  set productOwner(v) {
    this._productOwner = v;
  }

  set scrumMaster(v) {
    this._scrumMaster = v;
  }

  set team(v) {
    this._team = v;
  }

  set board(v) {
    this._board = v;
  }

  // --------------------------------------------------------------
  // GETTERS
  // --------------------------------------------------------------

  get name() {
    return this._name;
  }

  get requestDate() {
    return this._requestDate;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get description() {
    return this._description;
  }

  get productOwner() {
    return this._productOwner;
  }

  get scrumMaster() {
    return this._scrumMaster;
  }

  get team() {
    return this._team;
  }

  get board() {
    return this._board;
  }

}

schema.loadClass(Project);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Project', schema);
