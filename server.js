const jsonServer = require('json-server');
const server = jsonServer.create();
// const path = require('path');
// const express = require('express');
const middlewares = jsonServer.defaults({
  static: "./build"
});
const router = jsonServer.router('./db.json');
const port = process.env.PORT || 3001;

//----
server.use(middlewares)
//----


// server.use('/db', middlewares, router);
// server.use(express.static(path.join(__dirname, 'build')));

//----
server.use(jsonServer.rewriter({
  "/api/*": "$1",
}))
//----

// server.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


//----
server.use(router)
//----


server.listen(port, () => {
  console.log(`poty ${port}`);
});