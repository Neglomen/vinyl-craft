const express = require("express");
const pug = require("pug");
const path = require("path");
const app = express();
const routes = require("./routes/routes");
const port = 3001;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("views"));
app.use(routes);
app.use((req, res, next) => {
  console.log(`URL: ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
