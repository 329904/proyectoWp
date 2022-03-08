const express = require('express');

function list(req, res, next){
    res.send("proyecto list");
}

function index(req, res, next){
    res.send("proyecto index");
}

function create(req, res, next){
    res.send("proyecto create");
}

function replace(req, res, next){
    res.send("proyecto replace");
}

function edit(req, res, next){
    res.send("proyecto edit");
}

function destroy(req, res, next){
    res.send("proyecto destroy");
}

module.exports = {
    list, index, create, replace, edit, destroy
}