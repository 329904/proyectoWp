const express = require('express');

function list(req, res, next){
    res.send("scrumMaster list");
}

function index(req, res, next){
    res.send("scrumMaster index");
}

function create(req, res, next){
    res.send("scrumMaster create");
}

function replace(req, res, next){
    res.send("scrumMaster replace");
}

function edit(req, res, next){
    res.send("scrumMaster edit");
}

function destroy(req, res, next){
    res.send("scrumMaster destroy");
}

module.exports = {
    list, index, create, replace, edit, destroy
}