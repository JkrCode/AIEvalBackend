// endpoints.js
const express = require('express');
const jsonServerRouter = require('json-server').router;
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

// JSON-Server-Router für die API-Endpunkte
const jsonServer = jsonServerRouter('db.json');
router.use('/api', jsonServer);

// Registrierungsendpunkt
router.post('/user/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  jsonServer.db.get('users').push(newUser).write();
  res.status(201).json({ message: 'Registrierung erfolgreich.' });
});

// Login-Endpunkt
router.post('/user/login', (req, res) => {
  const { username, password } = req.body;
  const user = jsonServer.db
    .get('users')
    .find({ username, password })
    .value();
  if (user) {
    res.status(200).json({ message: 'login successfull.' });
  } else {
    res.status(401).json({ message: 'wrong credentials' });
  }
});

module.exports = router;
