const express = require('express');

function list(req, res, next){
    res.send("habilidad list");
}

function index(req, res, next){
    res.send("habilidad index");
}

function create(req, res, next){
    res.send("habilidad create");
}

function replace(req, res, next){
    res.send("habilidad replace");
}

function edit(req, res, next){
    res.send("habilidad edit");
}

function destroy(req, res, next){
    res.send("habilidad destroy");
}

module.exports = {
    list, index, create, replace, edit, destroy
}