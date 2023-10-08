const express = require('express');
const jsonServerRouter = require('json-server').router;
const bodyParser = require('body-parser');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

// router config
const jsonServer = jsonServerRouter('db.json');
userRouter.use('/api', jsonServer);

// Create User
userRouter.post('/user/register', (req, res) => {
  const { username, password } = req.body;
  const id = Math.random().toString();
  const newUser = { username, password, id};
  jsonServer.db.get('users').push(newUser).write();
  res.status(201).json({ message: 'Registrierung erfolgreich.', newUser });
});

// Login user
userRouter.post('/user/login', (req, res) => {
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

module.exports = userRouter;
