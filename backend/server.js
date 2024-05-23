const { MongoClient, ServerApiVersion } = require('mongodb');
const axios = require('axios');
const jsdom = require('jsdom');
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
  console.log('Server is running on port 3000');
 
});
 
app.get('/movies', async (req, res) => {
  const movies = await client.db("sample_mflix").collection("movies").find().limit(10).toArray();
  res.json(movies);
});

app.get('/comments', async (req, res) => {
  try {
    const comments = await client.db("sample_mflix").collection("comments").find().limit(10).toArray();
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
});
 
 
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    let mov = await client.db("sample_mflix").collection("movies").find(
        { title: "The Great Train Robbery" }
    ).limit(1).toArray();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log(mov);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}