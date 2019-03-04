const Client = require("instagram-private-api").V1; // Instagram API
const signale = require("signale");
const path = require("path");

// Create a device and storage for the Instagram API
const device = new Client.Device(process.env.INSTAGRAM_USERNAME);
const storage = new Client.CookieFileStorage(path.join(__dirname, `/../cookies/${process.env.INSTAGRAM_USERNAME}.json`));

// Create a variable for storing the session
var igsession = null;

// Set the 'service module's name
module.exports.name = "Instagram";

// This function is run once when the server is started, using environment
// variables to pass in values.
module.exports.setup = () => Client.Session.create(device, storage, process.env.INSTAGRAM_USERNAME, process.env.INSTAGRAM_PASSWORD).then((session) => {
  igsession = session;
  return session.getAccount();
}).then((account) => {
  signale.success("Connected to Instagram account " + account.params.username + "!");
  return true;
});

// This function is run whenever a photo is uploaded to be distributed,
// pass in job id, image path and caption.
module.exports.upload = (job, path, caption) => Client.Upload.photo(igsession, path).then((upload) => {
  signale.success(`Instagram Post Uploaded (ID=${upload.params.uploadId},Job=${job}). Now configuring...`);
  return Client.Media.configurePhoto(igsession, upload.params.uploadId, caption);
}).then((medium) => {
  signale.success(`Instagram Post Configured (Job=${job}). Uploaded to ${medium.params.webLink}!`);
  return true;
});