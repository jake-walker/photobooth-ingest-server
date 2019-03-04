const express = require("express");
const multer = require("multer");
const signale = require("signale");
const glob = require("glob");
const path = require("path");

const app = express();
const upload = multer({ dest: 'uploads/' });

// When a photo is uploaded to the server
app.post("/ingest", upload.single("photo"), (req, res, next) => {
  // Get the first 5 characters of the generated filename to use for the job id.
  const job = req.file.filename.substr(0, 5);

  // Create a list for storing all of the functions that need to be executed to
  // upload the image.
  const serviceList = [];

  // For each of the available services (in `services` folder)
  req.app.locals.services.forEach((service) => {
    // Add the upload function to the servicelist, passing in the job id, photo path
    // and caption.
    serviceList.push(service.upload(job, path.join(__dirname, req.file.path), "caption"))
  });

  signale.info(`Attempting upload for job ${job}...`);
  
  // Wait until all of the uploads are complete.
  Promise.all(promiseList).then((results) => {
    signale.success(`Uploads for job ${job} successful`);
    return res.json({
      ok: true
    });
  // Errors executing an upload
  }).catch((e) => {
    signale.error(`Errors while uploading for job ${job}`, e);
    return res.json({
      ok: false
    });
  });
});

// Start the web server on port 3000.
app.listen(3000, () => {
  signale.success("Listening on port 3000!");

  signale.info("Loading services...");
  // Create a list for loading the services into.
  app.locals.services = [];
  // For each of the 'service modules' in the `services` folder
  glob.sync("./services/*.js").forEach((file, i, arr) => {
    // Load the file into the service variable
    let service = require(file);
    // Add the service to the service list
    app.locals.services.push(service);

    // Run the setup function for the service
    service.setup().then(() => {
      signale.success(`${service.name} ready!`);
    }).catch((e) => {
      signale.error(`Error setting up ${service.name}`, e);
    })
  });
});