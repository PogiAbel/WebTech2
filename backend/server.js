const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
 
const mongoURI = `mongodb+srv://new-user1:shishi11@cluster0.f5daxyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();
app.use(cors());
 
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
  if (!title && !id) {
    res.json({'error': 'title or id is required'});
    return;
  }
  else if (id) {
    try {
      let _id = new ObjectId(id);
      let movie = await client.db("sample_mflix").collection("movies").findOne({_id});
      res.json(movie);
    } catch (error) {
      res.json({'error': error});
    }
    return;
  }
  try {
    const movies = await client.db("sample_mflix").collection("movies").find({title:{$regex: title}}).limit(10).toArray();
    res.json(movies);
  } catch (error) {
    res.json({'error': error});
  }
});

app.get('/comments', async (req, res) => {
  try {
    let movie_id = req.query.mID;
    let comments;

    if (!movie_id) {
      res.json({'error': 'movie_id is required'});
      return;
    }else{
      let mid = new ObjectId(movie_id);
      comments = await client.db("sample_mflix").collection("comments").find({movie_id:mid}).limit(10).toArray();
    }
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.json({'error': error});
  }
});

app.get('/theater', async (req, res) => {
  try {
    let theaters = await client.db("sample_mflix").collection("theaters").find().limit(10).toArray();
  } catch (error) {
    console.log(error);
    res.json({'error': error});
  }
});