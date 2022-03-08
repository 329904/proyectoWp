const express = require('express');

function list(req, res, next){
    res.send("valorFibonacci list");
}

function index(req, res, next){
    res.send("valorFibonacci index");
}

function create(req, res, next){
    res.send("valorFibonacci create");
}

function replace(req, res, next){
    res.send("valorFibonacci replace");
}

function edit(req, res, next){
    res.send("valorFibonacci edit");
}

function destroy(req, res, next){
    res.send("valorFibonacci destroy");
}

module.exports = {
    list, index, create, replace, edit, destroy
}