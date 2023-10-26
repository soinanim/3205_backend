const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
  const users = fs.readFileSync('users.json'); // Читаем файл. Название файла поменять на свое
  const parsedusers = JSON.parse(users);

  let result = {};

  console.log('req', req.query);
  console.log('users', parsedusers);

  parsedusers.map(
    (user) => user.email === req.query.email || user.number === req.query.number
  );

  if (parsedusers.includes(req.query.email)) {
  }
  const filepath = path.join(__dirname, 'users.json');

  try {
    await fs.promises.access(filepath, fs.constants.R_OK);
    return res.sendFile(filepath);
  } catch (err) {
    console.error('c', err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
