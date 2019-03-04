const Client = require("instagram-private-api").V1;

module.exports.instagram = (igsession, path, caption) => new Promise((resolve, reject) => {
  console.log("Uploading to Instagram...");
  return Client.Upload.photo(igsession, path)
}).then((upload) => {
  console.log(`Instagram Photo ID: ${upload.params.uploadId}`);
  return Client.Media.configurePhoto(igsession, upload.params.uploadId, caption);
}).then((medium) => {
  console.log("Instagram Caption Set!");
  //console.log(medium.params);
  return true;
});

module.exports.twitter = () => new Promise((resolve, reject) => {
  throw new Error("Not Implemented!");
});