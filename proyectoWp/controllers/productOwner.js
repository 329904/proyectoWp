const express = require('express');

function list(req, res, next){
    res.send("productOwner list");
}

function index(req, res, next){
    res.send("productOwner index");
}

function create(req, res, next){
    res.send("productOwner create");
}

function replace(req, res, next){
    res.send("productOwner replace");
}

function edit(req, res, next){
    res.send("productOwner edit");
}

function destroy(req, res, next){
    res.send("productOwner destroy");
}

module.exports = {
    list, index, create, replace, edit, destroy
}