const { createServer } = require('http');
const express = require('express');
const compression = require('compression')
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const normalizePort = port => parseInt(port, 10)
const PORT = normalizePort(process.env.PORT || 5000);

const app = express();

app.use(morgan('dev'));


// soporte para decodificar las url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));

  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const server = createServer(app);

server.listen(PORT, err => {
  if (err) throw err;

  console.log(`Listening on port ${PORT}`);
});