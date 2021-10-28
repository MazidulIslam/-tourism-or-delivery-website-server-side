const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nu4vl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("connected to db");
    const database = client.db("exploreWonderland");
    const placeCollections = database.collection("places");
    // Query for a movie that has the title 'Back to the Future'
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/places", (req, res) => {
  // i will send as json when I will receive from client side and fetct and convert as res=> res.json() .
  res.send("from place route");
});

app.get("/", (req, res) => {
  res.send("Hello World from explore Wonderland!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
