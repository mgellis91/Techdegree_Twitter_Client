# Techdegree Twitter Client

A Simple twitter client using express, jade and the twitter rest api

# Installation
download or clone the repo
```sh
$ git clone https://github.com/mgellis91/Techdegree_Twitter_Client.git
```
Install Dependencies
````sh
$ cd Techdegree_Twitter_Client
$ npm install
````
# Setting up Twitter keys

In order to run the app you will need to register your own twitter application at dev.twitter.com and replace the values in the configTemplate.js file (in the src directory) with your own corresponding values. **Your application will also have to have Read, Write and Access direct messages permissions in order for the client to work**. After you have entered your own values **rename the configTemplate.js file to config.js** 

# Running the client

```sh
$ nodemon src/app.js
```
