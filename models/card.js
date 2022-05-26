var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _narrative: String,
  _rol: String,
  _functionality: String,
  _benefit: String,
  _criteria: String,
  _context: String,
  _events: String,
  _results: String,
  _priority: Number,
  _size: Number,
});

class Card {
  constructor(narrative, rol, functionality, benefit, criteria,
              context, events, results, priority, size) {
    this._narrative = narrative;
    this._rol = rol;
    this._functionality = functionality;
    this._benefit = benefit;
    this._criteria = criteria;
    this._context = context;
    this._events = events;
    this._results = results;
    this._priority = priority;
    this._size = size;
  }

// ----------------------------------------------------------
// SETTERS
// ----------------------------------------------------------

  set narrative(v) {
    this._narrative = v;
  }

  set rol(v) {
    this._rol = v;
  }

  set functionality(v) {
    this._functionality = v;
  }

  set benefit(v) {
    this._benefit = v;
  }

  set criteria(v) {
    this._criteria = v;
  }

  set context(v) {
    this._context = v;
  }

  set events(v) {
    this._events = v;
  }

  set results(v) {
    this._results = v;
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

  get narrative() {
    return this._narrative;
  }

  get rol() {
    return this._rol;
  }

  get functionality() {
    return this._functionality;
  }

  get benefit() {
    return this._benefit;
  }

  get criteria() {
    return this._criteria;
  }

  get context() {
    return this._context;
  }

  get events() {
    return this._events;
  }

  get results() {
    return this._results;
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
