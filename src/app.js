const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user/user'); 
const postRouter = require('./routes/posts/posts');
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200, // Einige Browser benötigen dies, um die Antwort als erfolgreich zu betrachten
};

app.use(cors(corsOptions))

app.use(userRouter); 
app.use(postRouter);

app.listen(port, () => {
  console.log(`Die Anwendung läuft auf Port ${port}`);
});


