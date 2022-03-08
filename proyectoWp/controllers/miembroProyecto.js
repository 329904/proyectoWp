const express = require('express');

function list(req, res, next){
    res.send("miembroProyecto list");
}

function index(req, res, next){
    res.send("miembroProyecto index");
}

function create(req, res, next){
    res.send("miembroProyecto create");
}

function replace(req, res, next){
    res.send("miembroProyecto replace");
}

function edit(req, res, next){
    res.send("miembroProyecto edit");
}

function destroy(req, res, next){
    res.send("miembroProyecto destroy");
}

module.exports = {
    list, index, create, replace, edit, destroy
}