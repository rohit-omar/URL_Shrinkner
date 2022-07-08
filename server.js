const express = require("express");
const mongoose = require("mongoose");
const app = express();
const shortUrls = require('./models/shorlUrls')

mongoose
  .connect("mongodb://localhost:27017/url-shrinkner-data")
  .then(() => console.log("connection successful..."))
  .catch((e) => console.log(e));

const port = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res) => {
  // res.send("Hello form URL Shinkner");
  const shUrl = await shortUrls.find();

  res.render("index",{ shUrl: shUrl});
});

app.post("/shortUrls", async (req, res) => {
    await shortUrls.create({full: req.body.fullUrl})
    res.redirect('/')

});

app.get('/:shortUrl',async (req,res)=>{
  const originalURL = await shortUrls.findOne({ short: req.params.shortUrl});
  if(originalURL==null) return res.sendStatus(404);

  originalURL.click++;
  originalURL.save();
  res.redirect(originalURL.full);
})

app.listen(port, () => console.log(`listening to port ${port}`));
