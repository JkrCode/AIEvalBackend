const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const users = require('./routes/user/user'); 

app.use(users); 

app.listen(port, () => {
  console.log(`Die Anwendung läuft auf Port ${port}`);
});


