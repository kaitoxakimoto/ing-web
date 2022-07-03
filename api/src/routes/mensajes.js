const { MongoClient } = require("mongodb");
const { Router } = require("express");
const router = Router();
const _ = require("underscore");
var mongodb = require('mongodb')

const uri =
  "mongodb+srv://kaitoelakimoto:mongodb123@cluster0.uujtvbs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function createListing(client, newListing) {
  await client.connect();
  const result = await client
    .db("ingweb")
    .collection("mensajes")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

router.get("/", async (req, res) => {
  await client.connect();
  await client
    .db("ingweb")
    .collection("mensajes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      client.close();
    });
});

router.post("/", (req, res) => {
  const { nombre, email, mensaje } = req.body;
  if (nombre && email && mensaje) {
    const newMensaje = { ...req.body };
    console.log(newMensaje);
    res.json("saved");
    client.connect();
    createListing(client, newMensaje);
  } else {
    res.status(500).json({ error: "alo hubo un error jeje" });
  }
});

router.delete("/:id", async (req, res) => {
  //const id = req.body.id;
  var id = req.params.id;
  console.log(id);
  await client.connect();
  const result = await client
    .db("ingweb")
    .collection("mensajes")
    .deleteOne({"_id": new mongodb.ObjectId(id)});
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
  res.json("deleted");
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, mensaje } = req.body;

  if (tnombre && email && mensaje) {
    _.each(mensajes, (vmen, i) => {
      if (vmen.id == id) {
        vmen.email = email;
        vmene.nombre = nombre;
        vmen.mensaje = mensaje;
      }

      res.json(mensajes);
    });
  } else {
    res.status(500).json({ error: "woops" });
  }
});

module.exports = router;
