var express = require('express');
var app = express();

var port = process.env.port || "80";
app.set("port", port);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port)
console.log(`Listening on ${ PORT }`)