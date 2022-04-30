const express = require('express');
const Backlog = require('../models/backlog');

function list(req, res, next){
    // TODO: maybe paginate?
    // we need to do that for this eval?
    Backlog.find().then(objs => res.status(200).json({
        message: "Backlogs",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar los backlogs",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Backlog.findOne({"_id":id}).populate('__cards')
    .then(obj => res.status(200).json({
        message: res.__('ok.backlog'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.backlog'),
        obj: ex
    }));
}

function create(req, res, next){
    const name = req.body.name;
    const cards = req.body.cards;
    const burndown = req.body.burndown;

    let project = new Project({
        name:name,
        cards:cards,
        burndown:burndown,

    });

    backlog.save().then(obj => res.status(200).json({
        message: res.__('cr.backlog'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('ncr.backlog'),
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let cards = req.body.cards ? req.body.cards : "";
    let burndown = req.body.burndown ? req.body.burndown : "";

    let backlog = new Object({
        name : name,
        cards : cards,
        burndown : burndown,
    });

    Backlog.findOneAndUpdate({"_id":id}, backlog).then(obj => res.status(200).json({
        message: res.__('rp.backlog'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nrp.backlog'),
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let cards = req.body.cards;
    let burndown = req.body.burndown;

    let backlog = new Object();

    if(name){
        project._name = name;
    }
    if(cards){
        project._cards = cards;
    }
    if(burndown){
        project._burndown = burndown;
    }

    Backlog.findOneAndUpdate({"_id":id}, backlog).then(obj => res.status(200).json({
        message: res.__('up.backlog'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nup.backlog'),
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Backlog.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('dl.backlog'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('ndl.backlog'),
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, edit, destroy
};
