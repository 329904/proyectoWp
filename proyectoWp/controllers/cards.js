const express = require('express');
const Card = require('../models/card');

function list(req, res, next){
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
        message: `Tarjeta con id ${id}.`,
        obj: obj
    })).catch(ex => res.status(500).json({
        message: `no se pudo recuperar la tarjeta con id ${id}.`,
        obj: ex
    }));
}

function create(req, res, next){
    const name = req.body.name;
    const priority = req.body.priority;
    const size = req.body.size;

    let card = new Project({
        name:name,
        priority:priority,
        size:size,

    });

    card.save().then(obj => res.status(200).json({
        message:'Tarjeta creada correctamente',
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message:'No se pudo almacenar la tarjeta',
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
        message: "Tarjeta reemplazada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar la tarjeta",
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
        message: "Tarjeta reemplazada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar la tarjeta",
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Card.remove({"_id":id}).then(obj => res.status(200).json({
        message: "Tarjeta eliminada correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo eliminar la tarjeta",
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, edit, destroy
};