const express = require("express");
const app = express();
require("dotenv").config();
let ObjectId = require("mongodb").ObjectID;
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
    const offerCollections = database.collection("offers");
    const imageCollections = database.collection("gallery");
    const orderCollections = database.collection("orders");

    // GET API
    app.get("/offers", async (req, res) => {
      console.log(req.body);
      const cursor = offerCollections.find({});
      const offers = await cursor.toArray();
      res.send(offers);
    });
    // GET Single API Offer
    app.get("/offers/:id", async (req, res) => {
      const id = req.params.id;
      console.log("hitting id", id);
      const query = { _id: ObjectId(id) };
      const offer = await offerCollections.findOne(query);
      res.json(offer);
    });
    //   GET All Orders
    app.get("/orders", async (req, res) => {
      const cursor = orderCollections.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });
    // GET Single API Order
    app.get("/orders/:id", async (req, res) => {
      const id = req.params.id;
      console.log("hitting id", id);
      const query = { _id: ObjectId(id) };
      const order = await orderCollections.findOne(query);
      res.json(order);
    });
    // POST  API
    app.post("/offers", async (req, res) => {
      const offer = req.body;
      console.log("hit post api", offer);
      const result = await offerCollections.insertOne(offer);
      res.json(result);
    });

    // POST ORDERS
    app.post("/orders", async (req, res) => {
      const order = req.body;
      console.log("hit post api", order);
      const result = await orderCollections.insertOne(order);
      res.json(result);
    });

    // DELETE API
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollections.deleteOne(query);
      res.json(result);
      // on module 65.8
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/places", (req, res) => {
  // i will send as json when I will receive from client side and fetct and convert as res=> res.json() .
  res.send("from place route");
});

app.get("/", (req, res) => {
  res.send("Hello World from explore Wonderland Server!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
