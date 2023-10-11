const express = require("express");
const app = express();

const model = require("./model");
app.get("/", (req, res) => {
  res.send(hi);
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const url = "mongodb://127.0.0.1:27017/demo";
const mongoose = require("mongoose");
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch(() => {
    console.log("err");
  });
app.use(express.static(__dirname));
app.use(express.json());

// app.get("/data", (req, res) => {
//   res.send("hiii"); // Send "hiii" as the response
// });
app.get("/data", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // Send "hiii" as the response
});

app.delete("/data/:id", async (req, res) => {
  var data = await model.findByIdAndDelete(req.params.id);
  res.json(await model.find());
});
app.post("/data", async (req, res) => {
  const { name, pass } = req.body;

  const data = new model({
    name,
    pass,
  });
  data.save();
  res.send(await model.find());
});

app.get("/data/api", async (req, res) => {
  res.send(await model.find());
});

app.listen(4444, () => {
  console.log("done");
});
