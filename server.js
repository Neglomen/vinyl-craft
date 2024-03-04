const express = require("express");
const pug = require("pug");
const path = require("path");

const app = express()
const routes = require('./app/routes/routes');
const port = 3001


app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.set(path.join(__dirname, "./views"));
app.set("view engine", "pug");



app.use(routes);

const server = app.listen(process.env.PORT || port, () => {
  console.log(`Server został uruchomiony na porcie :   ${process.env.PORT }`);
});
