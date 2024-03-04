const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
let fullImagesPath = path.join(__dirname, "../../public/img/realizacje/full/");
let thumbnailsPath = path.join(
  __dirname,
  "../../public/img/realizacje/thumbnails/"
);

let thumbnailsImages = [];

exports.index = (req, res) => {
  fs.readdir(fullImagesPath, (err, fullImagesCatalog) => {
    if (err) {
      console.error(`1 Błąd odczytu katalogu: ${err}`);
      return;
    }
    let galleryData = [];
    fullImagesCatalog.sort(function (a, b) {
      let numA = parseInt(a.split(".")[0]);
      let numB = parseInt(b.split(".")[0]);
      return numA - numB;
    });
    fullImagesCatalog.forEach((folder) => {
      let folderPath = path.join(fullImagesPath, folder);
      let thumbnailFolderPath = path.join(thumbnailsPath, folder);
      let images = fs
        .readdirSync(folderPath)
        .filter(
          (file) =>
            file.endsWith(".jpg") ||
            file.endsWith(".jpeg") ||
            file.endsWith(".png") ||
            file.endsWith(".jpeg")
        )
        .map((image) => path.join(thumbnailFolderPath, image));

      // Sprawdzenie czy w folderze thumbnails znajduje się odpowiedni katalog

      if (!fs.existsSync(thumbnailFolderPath)) {
        fs.mkdirSync(thumbnailFolderPath);
      }

      // Pobranie zdjęć z folderu full
      imagePath = [];
      images.forEach(async (image) => {
        let imageName = path.basename(image);
        let thumbnailImagePath = thumbnailsPath + folder + "/" + imageName;
        imagePath.push("img/realizacje/thumbnails/" + folder + "/" + imageName);
        if (!fs.existsSync(path.join(thumbnailImagePath))) {
          let imageMetadata = await sharp(
            path.join(__dirname, "../public/img/realizacje/full", image)
          ).metadata();
          let isLandscape = imageMetadata.width > imageMetadata.height;
          let width, height;
          if (isLandscape) {
            width = 500;
            height = null;
          } else {
            width = null;
            height = 500;
          }
          let imageData = await sharp(
            path.join(
              __dirname,
              "../public/img/realizacje/full",
              folder,
              imageName
            )
          )
            .resize({
              width,
              height,
              fit: sharp.fit.inside,
              withoutEnlargement: true,
            })
            .toBuffer();

          fs.writeFileSync(
            path.join(__dirname, "../public", thumbnailImagePath),
            imageData
          );
        }
      });
      galleryData.push({
        folder: folder,
        images: imagePath,
        place: folder.replace(/^\d+[.]\s/, ""),
        location: folder
          .replace(/^\d+[.]\s/, "")
          .split(" ")
          .pop(),
      });
    });

    res.render("gallery", { galleryData: galleryData });
  });
};

exports.getImages = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(thumbnailsImages);
};
