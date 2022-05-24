const express = require('express');
const Card = require('../models/card');

function list(req, res, next){
    // TODO: paginate?
    Card.find().then(objs => res.status(200).json({
        message: "Lista de tarjetas",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la lista de tarjetas",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Card.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.card'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.card'),
        obj: ex
    }));
}

function create(req, res, next){
    const name = req.body.name;
    const priority = req.body.priority;
    const size = req.body.size;

    let card = new Card({
        name:name,
        priority:priority,
        size:size,

    });

    card.save().then(obj => res.status(200).json({
        message: res.__('cr.card'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('ncr.card'),
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let priority = req.body.priority ? req.body.priority : "";
    let size = req.body.size ? req.body.size : "";

    let card = new Object({
        name : name,
        priority : priority,
        size : size,
    });

    Card.findOneAndUpdate({"_id":id}, card).then(obj => res.status(200).json({
        message: res.__('rp.card'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nrp.card'),
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let priority = req.body.priority;
    let size = req.body.size;

    let card = new Object();

    if(name){
        project._name = name;
    }
    if(priority){
        project._priority = priority;
    }
    if(size){
        project._size = size;
    }

    Card.findOneAndUpdate({"_id":id}, card).then(obj => res.status(200).json({
        message: res.__('up.card'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nup.card'),
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Card.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('dl.card'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('ndl.card'),
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, edit, destroy
};
