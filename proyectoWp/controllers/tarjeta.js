const express = require('express');

function list(req, res, next){
    res.send("tarjeta list");
}

function index(req, res, next){
    res.send("tarjeta index");
}

function create(req, res, next){
    res.send("tarjeta create");
}

function replace(req, res, next){
    res.send("tarjeta replace");
}

function edit(req, res, next){
    res.send("tarjeta edit");
}

function destroy(req, res, next){
    res.send("tarjeta destroy");
}

module.exports = {
    list, index, create, replace, edit, destroy
}