const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user/user'); 
const postRouter = require('./routes/posts/posts')

app.use(userRouter); 
app.use(postRouter);

app.listen(port, () => {
  console.log(`Die Anwendung läuft auf Port ${port}`);
});


