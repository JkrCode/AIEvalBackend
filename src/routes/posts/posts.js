const express = require('express');
const jsonServerRouter = require('json-server').router;
const bodyParser = require('body-parser');

const postRouter = express.Router();

postRouter.use(bodyParser.json());

// router config
const jsonServer = jsonServerRouter('db.json');
postRouter.use('/api', jsonServer);

// Create Post
postRouter.post('/posts/', (req, res) => {
  const { title, text, userId } = req.body;
  const postId = Math.random().toString()
  const newPost = { title, text, userId, postId};
  const id= userId;
  const user = jsonServer.db.get('users').find({id}).value()
  if(user){
    jsonServer.db.get('posts').push(newPost).write();
    res.status(201).json({ message: 'posts created.', newPost });
  } else {
    res.status(404).json({message: 'Bad Request'})
  }
});

// get all posts with userId
postRouter.get('/posts/', (req, res)=>{
    const userId = req.body.userId;
    const posts = jsonServer.db.get('posts').filter({userId}).value();
    res.status(200).json({posts: posts})
});

module.exports = postRouter;
