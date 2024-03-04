const express = require('express');
const router = express.Router();

const controller = require("../controllers/contact.controller");
const gallery = require('../controllers/gallery');
const home = require('../controllers/index');




router.get('/',home.index)
router.get('/realizacje',gallery.index)
router.get('/realizacje/images',gallery.getImages)

router.get("/offer", (req, res) => {
    res.render("offer");
  });

  router.get("/about", (req, res) => {
    res.render("about", {
      title: "Vinyl craft",
    });
  });

  router.get("/contact", (req, res) => {
    res.render("contact", {
      title: "Vinyl craft",
    });
  });

  router.post("/contact", (req, res) => {
    console.log(req.body);
    controller.send(req, res);
  });

module.exports = router;