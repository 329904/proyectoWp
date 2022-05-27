const config = require('config');
const express = require('express');
const Project = require('../models/project');

function list(req, res, next){
    // TODO: paginate?
    let page = req.params.page ? req.params.page : 1;
    Project.paginate({}, {page:page, limit: 5})
    .then(objs => res.render("project/list", {projects:objs}))
    .catch(ex => res.status(500).json({
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

function add(req, res, next){
    res.render('project/add', {});
}

function create(req, res, next){
    const name = req.body.name;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const productOwner = req.body.productOwner;
    const scrumMaster = req.body.scrumMaster;
    const team = req.body.team;
    const board = req.body.board;
    const description = req.body.description;

    let project = new Project({
        name:name,
        startDate:startDate,
        endDate:endDate,
        productOwner:productOwner,
        scrumMaster:scrumMaster,
        team:team,
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
    let startDate = req.body.startDate ? req.body.startDate : "";
    let endDate = req.body.endDate ? req.body.endDate : "";
    let productOwner = req.body.productOwner ? req.body.productOwner : "";
    let scrumMaster = req.body.scrumMaster ? req.body.scrumMaster : "";
    let team = req.body.team ? req.body.team : "";
    let board = req.body.board ? req.body.board : "";
    let description = req.body.description ? req.body.description : "";

    let project = new Object({
        _name : name,
        _startDate : startDate,
        _endDate : endDate,
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
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let productOwner = req.body.productOwner;
    let scrumMaster = req.body.scrumMaster;
    let team = req.body.team;
    let board = req.body.board;
    let description = req.body.description;

    let project = new Object();

    if(name){
        project._name = name;
    }
    if(startDate){
        project._startDate = startDate;
    }
    if(endDate){
        project._endDate = endDate;
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
    list, index, add, create, replace, edit, destroy
};
