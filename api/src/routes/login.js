const { MongoClient } = require("mongodb");
const { Router } = require("express");
const router = Router();
const _ = require("underscore");
const crypto = require("crypto");
const { morgan } = require("morgan");

var tokens = [];

const uri =
  "mongodb+srv://kaitoelakimoto:mongodb123@cluster0.uujtvbs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


// Obtencion de token de inicio de sesion
router.post("/", async (req, res) => {
    console.log("inciio"+req.body);
  const user = req.body.user;
  const password = req.body.password;
  const hash = crypto.createHash("sha256").update(password).digest("base64");
  await client.connect();
  await client
    .db("ingweb")
    .collection("usuarios")
    .find({ user: user })
    .toArray(function (err, result) {
      if (err) throw err;
      if (JSON.stringify(result) != "[]" && result[0].password == hash) {
        const token = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 5);
        const typee = result[0].type;
        var encontro=false;
        tokens.forEach((elemento) => {
            if (elemento.user == user){
                client.close();
                res.json({ token: elemento.token });
                encontro = true;
            }
        });
        if(encontro==false){
            tokens.push({ user: user, type: typee, token });
            client.close();
            res.json({ token: token });
        }
      } else {
        client.close();
        res.json({ token: "" });
      }
      
    });
});

// Obtencion de tipo de sesion con token
router.post("/token", async (req, res) => {
  const tokenarevisar = req.body.token;
  var flag = false
  for (let i of tokens) {
    if (i.token == tokenarevisar){
      res.json({tipo: i.type});
      flag = true;
    }
  }
  if (!flag){
    res.json({tipo: "none"});
  }

});

module.exports = router;
