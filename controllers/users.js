const express = require('express');
const async = require('async');
const bcrypt = require('bcrypt');
const User = require('../models/user');

function list(req, res, next){
    let page = req.params.page ? req.params.page : 1;
    User.paginate({}, {page:page, limit: 5})
    .then(objs => res.render("user/list", {users:objs}))
    .catch(ex => res.status(500).json({
        message: "No se pudo consultar la lista de usuarios",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.user'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.user'),
        obj: ex
    }));
}

function add(req, res, next){
    res.render('user/add', {});
}

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const bornDate = req.body.bornDate;
    const address = req.body.address;
    const curp = req.body.curp;
    const rfc = req.body.rfc;
    const password = req.body.password;

    const skills = new Object();
    skills.skillName = req.body.skillName;
    skills.rank = req.body.rank;

    async.parallel({
        salt: (callback) => bcrypt.genSalt(10, callback)
    }, (err, result) => {
    bcrypt.hash(password, result.salt, (err, hash) => {
      const user = new User({
        name: name,
        lastName: lastName,
        bornDate: bornDate,
        curp: curp,
        rfc: rfc,
        address: address,
        skills: skills,
        password: hash,
        salt: result.salt
      });
      user.save()
      .then(obj => res.status(200).json({
        message: res.__('cr.user'),
        data: obj
      }))
      .catch(err => res.status(500).json({
        message: res.__('ncr.user'),
        data: err
      }));
    });
  });
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let bornDate = req.body.bornDate ? req.body.bornDate : "";
    let address = req.body.address ? req.body.address : "";
    let curp = req.body.curp ? req.body.curp : "";
    let rfc = req.body.rfc ? req.body.rfc : "";
    let password = req.body.password ? req.body.password : "";

    let user = new Object({
        _name : name,
        _lastName : lastName,
        _bornDate : bornDate,
        _address : address,
        _curp : curp,
        _rfc : rfc,
        _password : password,
    });

    User.findOneAndUpdate({"_id":id}, user).then(obj => res.status(200).json({
        message: res.__('rp.user'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nrp.user'),
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let bornDate = req.body.bornDate;
    let address = req.body.address;
    let curp = req.body.curp;
    let rfc = req.body.rfc;
    let password = req.body.password;

    let member = new Object();

    if(name){
        member._name = name;
    }
    if(lastName){
        member._lastName = lastName;
    }
    if(bornDate){
        member._bornDate = bornDate;
    }
    if(address){
        member._address = address;
    }
    if(curp){
        member._curp = curp;
    }
    if(rfc){
        member._rfc = rfc;
    }
    if(password){
        member._password = password;
    }

    User.findOneAndUpdate({"_id":id}, user).then(obj => res.status(200).json({
        message: res.__('up.user'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nup.user'),
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    User.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('dl.user'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('ndl.user'),
        obj: ex
    }));
}

module.exports = {
    list, index, add, create, replace, edit, destroy
};
