const path = require("path");
const favicon = require("serve-favicon");
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger");
const multer = require("multer");
const fs = require("node:fs");

const { authenticate } = require("@feathersjs/authentication").hooks;

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");

const middleware = require("./middleware");
const services = require("./services");
const appHooks = require("./app.hooks");
const channels = require("./channels");

const authentication = require("./authentication");

const sequelize = require("./sequelize");

const upload = multer({ dest: "public/images/" });
const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Host the public folder
app.use("/", express.static(app.get("public")));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// app.use("/files", multer().single("file"));
// // app.use("/images/single", upload.single("imagePerfil"), (req, res) => {
// app.use("/images", upload.single("imagePerfil"), (req, res) => {
//   console.log({ req });
//   saveImage(req.file);
//   res.send("Termina");
// });

// app.use("/images/multi", upload.array("photos", 10), (req, res) => {
//   console.log({ files: req.files });
//   req.files.map(saveImage);
//   res.send("Termina multi");
// });

// function saveImage(file) {
//   const newPath = `./public/images/${file.originalname}`;
//   // console.log({ file, newPath, originalname: file.originalname });
//   fs.renameSync(file.path, newPath);
//   return newPath;
// }

// service.hooks({
//   before: {
//     all: [authenticate("jwt")],
//   },
// });
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
