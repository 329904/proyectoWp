const express = require('express');
const Backlog = require('../models/backlog');

function list(req, res, next){
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
    Backlog.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Backlog con id ${id}.`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: `no se pudo recuperar el backlog con id ${id}.`,
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
        message:'Backlog creado correctamente',
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message:'No se pudo almacenar el backlog',
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
        message: "Backlog reemplazado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar el backlog",
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
        message: "Backlog reemplazado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar el backlog",
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Backlog.remove({"_id":id}).then(obj => res.status(200).json({
        message: "Backlog eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo eliminar el backlog",
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, edit, destroy
};