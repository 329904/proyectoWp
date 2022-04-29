const express = require('express');
const ScrumBoard = require('../models/scrumBoard');

function list(req, res, next){
    ScrumBoard.find().then(objs => res.status(200).json({
        message: "Tableros Scrum",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la lista de Tableros Scrum",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    ScrumBoard.findOne({"_id":id}).then(obj => res.status(200).json({
        message: `Tablero con id ${id}.`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: `no se pudo recuperar el tablero con id ${id}.`,
        obj: ex
    }));
}

function create(req, res, next){
    const prtoductBacklog = req.body.prtoductBacklog;
    const releases = req.body.releases;
    const sprintsBacklog = req.body.sprintsBacklog;

    let project = new Project({
        prtoductBacklog:prtoductBacklog,
        releases:releases,
        sprintsBacklog:sprintsBacklog,

    });

    scrumBoard.save().then(obj => res.status(200).json({
        message:'Tablero creado correctamente',
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message:'No se pudo almacenar el tablero',
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let prtoductBacklog = req.body.prtoductBacklog ? req.body.prtoductBacklog : "";
    let releases = req.body.releases ? req.body.releases : "";
    let sprintsBacklog = req.body.sprintsBacklog ? req.body.sprintsBacklog : "";

    let scrumBoard = new Object({
        prtoductBacklog : prtoductBacklog,
        releases : releases,
        sprintsBacklog : sprintsBacklog,
    });

    ScrumBoard.findOneAndUpdate({"_id":id}, scrumBoard).then(obj => res.status(200).json({
        message: "Tablero reemplazado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar el tablero",
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    let prtoductBacklog = req.body.prtoductBacklog;
    let releases = req.body.releases;
    let sprintsBacklog = req.body.sprintsBacklog;

    let scrumBoard = new Object();

    if(prtoductBacklog){
        project._prtoductBacklog = prtoductBacklog;
    }
    if(releases){
        project._releases = releases;
    }
    if(sprintsBacklog){
        project._sprintsBacklog = sprintsBacklog;
    }

    ScrumBoard.findOneAndUpdate({"_id":id}, scrumBoard).then(obj => res.status(200).json({
        message: "Tablero reemplazado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar el tablero",
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    ScrumBoard.remove({"_id":id}).then(obj => res.status(200).json({
        message: "Tablero eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo eliminar el tablero",
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, edit, destroy
};