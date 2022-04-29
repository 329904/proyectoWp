var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

var schema = new mongoose.Schema({
  _productBacklog: {
    type: mongoose.ObjectId,
    ref: 'Backlog'
  },
  _releases: [{
    type: mongoose.ObjectId,
    ref: 'Backlog'
  }],
  _sprintsBacklog: [{
    type: mongoose.ObjectId,
    ref: 'Backlog'
  }]
  // TODO:
  // maybe add user story(card)?
  // how to implement epic?
  // burndown charts?
  // Retrospectives? -- maybe this is only physycal and not online
});

class ScrumBoard {
  constructor(productBacklog, releases, sprints) {
    this._productBacklog = productBacklog;
    this._releases = releases;
    this._sprintsBacklog = sprints;
  }

  set productBacklog(v) {
    this._productBacklog = v;
  }

  set releases(v) {
    this._releases = v;
  }

  set sprintsBacklog(v) {
    this._sprintsBacklog = v;
  }

// ---------------------------------------------------------
// GETTERS
// ---------------------------------------------------------

  get productBacklog() {
    return this._productBacklog;
  }

  get releases() {
    return this._releases;
  }

  get sprintsBacklog() {
    return this._sprintsBacklog;
  }

}

schema.loadClass(ScrumBoard);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('ScrumBoard', schema);
