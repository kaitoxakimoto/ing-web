const { MongoClient } = require("mongodb");
const { Router } = require("express");
const router = Router();
const _ = require("underscore");
const crypto = require("crypto");
const { morgan } = require("morgan");

const uri =
  "mongodb+srv://kaitoelakimoto:mongodb123@cluster0.uujtvbs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function createUser(client, newListing) {
  await client.connect();
        const result = await client
          .db("ingweb")
          .collection("usuarios")
          .insertOne(newListing);
        console.log(
          `New listing created with the following id: ${result.insertedId}`
        );
}

async function userExists(client,user){
    return new Promise(async resolve => {
        await client.connect();
        await client
          .db("ingweb")
          .collection("usuarios")
          .find({ user: user })
          .toArray(async function (err, result) {
            if (err) throw err;
            if (JSON.stringify(result) != "[]") {
                resolve (true);
            } else {
                resolve (false);
            }
          });
      });

}

//Registro de nuevo usuario
router.post("/", async (req, res) => {
  const { user, password } = req.body;
  hash = crypto.createHash("sha256").update(password).digest("base64");
  if (user && hash) {
    const newUser = { user: user, password: hash, type: "user" };
    
    client.connect();
    const existe = await userExists(client,user)
    console.log(existe)
    if (!existe ){
        console.log("exist");
        createUser(client, newUser);
        res.json({mensaje:"Usuario creado con éxito", status:"si"});
    }
    else{
        res.json({mensaje:"El usuario ya existe!", status:"no"});
    }
  } else {
    res.status(500).json({ error: "alo hubo un error jeje" });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  _.each(mensajes, (mensaje, i) => {
    if (mensaje.id == id) {
      mensajes.splice(i, 1);
    }
  });
  res.json(mensajes);
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
