var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var schema = new mongoose.Schema({
  _name: String,
  _LastName: String,
  _bornDate: String,
  _curp: String,
  _rfc: String,
  _address: String,
  _skills: [{
    type: mongoose.ObjectId,
    ref: 'Skill'
  }],
  _password: String,
  _salt: String

  // TODO:
  // prob we should listen to the prof and add UserRole
  // maybe in the next eval? :)
});

class User {
  constructor(name, lastName, bornDate, curp, rfc, address,
    skills, password, salt) {
    this._name = name;
    this._lastName = lastName;
    this._bornDate = bornDate;
    this._curp = curp;
    this._rfc = rfc;
    this._address = address;
    this._skills = skills;
    this._password = password;
    this._salt = salt;
  }

  // -------------------------------------------------------------------------
  // SETTERS
  // -------------------------------------------------------------------------

  set name(v) {
    this._name = v;
  }

  set lastName(v) {
    this._lastName = v;
  }

  set bornDate(v) {
    this._bornDate = v;
  }

  set curp(v) {
    this._curp = v;
  }

  set rfc(v) {
    this._rfc = v;
  }

  set address(v) {
    this._address = v;
  }

  set skills(v) {
    this._skills = v;
  }

  set password(v) {
    this._password = v;
  }

  set salt(v) {
    this._salt = v;
  }

  // -------------------------------------------------------------------------
  // GETTERS
  // -------------------------------------------------------------------------

  get name() {
    return this._name;
  }

  get lastName() {
    return this._lastName;
  }

  get bornDate() {
    return this._bornDate;
  }

  get curp() {
    return this._curp;
  }

  get rfc() {
    return this._rfc;
  }

  get address() {
    return this._address;
  }

  get skills() {
    return this._skills;
  }

  get password() {
    return this._password;
  }
  get salt() {
    return this._salt;
  }

  // TODO:
  // removeSkill()

  auth(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, this.salt, (err, hash) => {
        if(err) {
          reject(err)
        } else {
          if(hash != this.password) {
            resolve(null)
          } else jwt.sign({
            userId: this.id
          }, 'key', (err, token) => {
            if(err) {
              reject(err)
            }
            else {
              resolve(token)
            }
          });
        }
      });
    });
  }
}

schema.loadClass(User);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', schema);
