const express = require('express');
const User = require('../models/user');

function list(req, res, next){
    User.find().then(objs => res.status(200).json({
        message: "Lista de usuarios registrados",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la lista de usuarios",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Usuario con id ${id}.`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: `No se pudo recuperar el usuario con id ${id}.`,
        obj: ex
    }));
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

    let user = new User({
        name:name,
        lastName:lastName,
        bornDate:bornDate,
        address:address,
        curp:curp,
        rfc:rfc,
        password:password,
        skills:skills,
        salt: ""
    });

    user.save().then(obj => res.status(200).json({
        message:'Usuario creado correctamente',
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message:'No se pudo almacenar el usuario',
        obj: ex
    }));
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
        message: "Usuario reemplazado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar el usuario",
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
        message: "Usuario reemplazado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar el usuario",
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    User.remove({"_id":id}).then(obj => res.status(200).json({
        message: "Usuario eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo eliminar el usuario",
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, edit, destroy
};