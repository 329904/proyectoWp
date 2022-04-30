const express = require('express');
const Project = require('../models/project');

function list(req, res, next){
    // TODO: paginate?
    Project.find().then(objs => res.status(200).json({
        message: "Lista de proyectos",
        obj: objs
    })).catch(ex => res.status(500).json({
        message: "No se pudo consultar la lista de proyectos",
        obj: ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Project.findOne({"_id":id}).then(obj => res.status(200).json({
        message: res.__('ok.project'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('bad.project'),
        obj: ex
    }));
}

function create(req, res, next){
    const name = req.body.name;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const productOwner = req.body.productOwner;
    const scrumMaster = req.body.scrumMaster;
    const team = req.body.team;
    const board = req.body.board;
    const description = req.body.description;

    let project = new Project({
        name:name,
        start_date:start_date,
        end_date:end_date,
        productOwner:productOwner,
        scrumMaster:scrumMaster,
        team:team,
        board:board,
        board:board,
        description:description
    });

    project.save().then(obj => res.status(200).json({
        message: res.__('cr.project'),
        obj: obj
    }))
    .catch(ex => res.status(500).json({
        message: res.__('ncr.project'),
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let start_date = req.body.start_date ? req.body.start_date : "";
    let end_date = req.body.end_date ? req.body.end_date : "";
    let productOwner = req.body.productOwner ? req.body.productOwner : "";
    let scrumMaster = req.body.scrumMaster ? req.body.scrumMaster : "";
    let team = req.body.team ? req.body.team : "";
    let board = req.body.board ? req.body.board : "";
    let description = req.body.description ? req.body.description : "";

    let project = new Object({
        _name : name,
        _start_date : start_date,
        _end_date : end_date,
        _productOwner : productOwner,
        _scrumMaster : scrumMaster,
        _team : team,
        _board : board,
        _description : description
    });

    Project.findOneAndUpdate({"_id":id}, project).then(obj => res.status(200).json({
        message: res.__('rp.project'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nrp.project'),
        obj: ex
    }));
}

function edit(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let productOwner = req.body.productOwner;
    let scrumMaster = req.body.scrumMaster;
    let team = req.body.team;
    let board = req.body.board;
    let description = req.body.description;

    let project = new Object();

    if(name){
        project._name = name;
    }
    if(start_date){
        project._start_date = start_date;
    }
    if(end_date){
        project._end_date = end_date;
    }
    if(productOwner){
        project._productOwner = productOwner;
    }
    if(scrumMaster){
        project._scrumMaster = scrumMaster;
    }
    if(team){
        project._team = team;
    }
    if(board){
        project._board = board;
    }
    if(description){
        project._description = description;
    }

    Project.findOneAndUpdate({"_id":id}, project).then(obj => res.status(200).json({
        message: res.__('up.project'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('nup.project'),
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Project.remove({"_id":id}).then(obj => res.status(200).json({
        message: res.__('dl.project'),
        obj: obj
    })).catch(ex => res.status(500).json({
        message: res.__('ndl.project'),
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, edit, destroy
};
