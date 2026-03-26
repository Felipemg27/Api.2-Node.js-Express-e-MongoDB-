const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = 3000;

const Film = mongoose.model('Film', {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,

});

app.get('/', async (req, res) => {
  const films = await Film.find();
  return res.send(films);
})

app.delete('/:id', async (req, res) => {
  const film = await Film.findByIdAndDelete(req.params.id);
  return res.send(film);
})

app.put('/:id', async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url

  }, { new: true });
  return res.send(film);
})

app.post('/', async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  })
  await film.save()
  res.send(film);
})

app.listen(port, () => {
  mongoose.connect('mongodb://felipevelosoxd_db_user:Fnh4AaWou3VKuvdh@ac-snjxiyy-shard-00-00.oukwpzm.mongodb.net:27017,ac-snjxiyy-shard-00-01.oukwpzm.mongodb.net:27017,ac-snjxiyy-shard-00-02.oukwpzm.mongodb.net:27017/?ssl=true&replicaSet=atlas-ggcjo0-shard-0&authSource=admin&appName=Cluster0&retryWrites=true&w=majority',);
  console.log(`App running `);
})