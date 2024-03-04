const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
let carouselPath = path.join("./public/img/carousel/");

exports.index = (req, res) => {
  fs.readdir(carouselPath, (err, images) => {
    if (err) {
      console.error(`2 Błąd odczytu katalogu: ${err}`);
      return;
    } else {
      console.error(images);
    }

    let imagesPath = [];
    images.forEach((image) => {
      imagesPath.push(path.join("img/carousel/", image));
    });

    console.log(imagesPath);
    let imagesData = {
      imagesPath: imagesPath,
    };

    res.render("index", { imagesData: imagesData });
  });
};
