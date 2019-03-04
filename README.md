# 📷 Photobooth Ingest Server
A simple server to take photos and distribute to various social networks.

This is a Node.js server which is designed to take photos that are uploaded from a device such as a Raspberry Pi. The program will then distribute the photo across different social networks.

This project was originally created to take in photos from a Raspberry Pi and distribute them to various social media platforms. This Raspberry Pi was using mobile data so it would have been inefficient to upload a photo 2 or 3 times when it could be uploaded once to a server and then distributed out from there.

## Problems
**This code is definitely not meant to be used in a production environment.** It has been quickly put together for one quick job. Here are some of the things that you might want to do if you wanted to run this in production:

- Add authentication to the `/ingest` endpoint.
- ...