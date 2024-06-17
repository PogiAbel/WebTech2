const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
 
const mongoURI = `mongodb+srv://new-user1:shishi11@cluster0.f5daxyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();
app.use(cors());
const min = 10;
let limit = min;
 
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
app.listen(3000, async () =>{
  await client.connect();
  console.log('Server is running on port 3000: http://localhost:3000');
 
});
 
app.get('/movies', async (req, res) => {
  let title = req.query.title;
  let id = req.query.id;
  let more = req.query.more;

  // load more movies
  if (more) {
    limit += min;
  } else {
    limit = min;
  }

  // intial load
  if (!title && !id) {
    let movie = await client.db("sample_mflix").collection("movies").find().limit(limit).toArray();
    res.json(movie);
    return;
  }
  else if (id) { // get movie by id
    try {
      let _id = new ObjectId(id);
      let movie = await client.db("sample_mflix").collection("movies").findOne({_id});
      res.json(movie);
    } catch (error) {
      res.json({'error': error});
    }
    return;
  }
  try { // search movie by title
    const movies = await client.db("sample_mflix").collection("movies").find({title:{$regex: title, $options: "i"}}).limit(limit).toArray();
    res.json(movies);
  } catch (error) {
    res.json({'error': error});
  }
});

app.get('/comments', async (req, res) => {
  try {
    let movie_id = req.query.movie_id;
    let comments;

    if (!movie_id) {
      res.json({'error': 'movie_id is required'});
      return;
    }else{
      let mid = new ObjectId(movie_id);
      comments = await client.db("sample_mflix").collection("comments").find({movie_id:mid}).limit(10).toArray();
      res.json(comments);
    }
  } catch (error) {
    console.log(error);
    res.json({'error': error});
  }
});

app.get('/user', async (req, res) => {
  try {
    let email = req.query.email;
    let password = req.query.password;
    let result;

    if (!email || !password) {
      res.json(null);
      return;
    } else {
      let user = await client.db("sample_mflix").collection("users").findOne({email: email, password: password});
      if(user == null){ res.json(null); return;}

      let response = {
        _id: user._id,
        email: user.email,
        name: user.name,
      }
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    res.json({'error': error});
  }
});

app.post('/comment', async (req, res) => {
  try {
    let movie_id = req.query.movie_id;
    let user_id = req.query.user_id;
    let comment = req.query.comment;
    let userName = req.query.userName;
    let userEmail = req.query.userEmail;
    let date = new Date();
    let mid = new ObjectId(movie_id);

    if (!movie_id || !userName || !comment) {
      res.json({'error': 'movie_id, user_id and comment are required'});
      return;
    } else {
      let response = await client.db("sample_mflix").collection("comments").insertOne({name: userName,email: userEmail,movie_id: mid,text: comment,date:date});
      console.log(response);
      res.json(response);
    }
  } catch (error) {
    console.log(error);
    res.json({'error': error});
  }
});

app.post('/deleteComment', async (req, res) => {
  let comment_id = req.query.comment_id;
  let cid = new ObjectId(comment_id);
  let response = await client.db("sample_mflix").collection("comments").deleteOne({_id: cid});
  res.json(response);
});