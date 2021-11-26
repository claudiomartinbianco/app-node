var express = require('express');
var app = express();

var port = process.env.port || "1337";
app.set("port", port);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port)
console.log(`Listening on ${ PORT }`)