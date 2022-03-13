const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const express = require('express');
const middlewares = jsonServer.defaults({
  static: "./build"
});
const router = jsonServer.router('./db.json');
const port = process.env.PORT || 3001;

server.use('/db', middlewares, router);
server.use(express.static(path.join(__dirname, 'build')));

server.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => {
  console.log(`poty ${port}`);
});