# Start a new Express server with MongoDB

### File structure

* app.js
* .env
* model/
  * Model.js (one of these per DB collection)
* controllers/
  * routes.js (one of these per DB collection)
* db.js
* public/ (optional)
* (package.json)
* (package-lock.json)
* (node_modules)

### Set up steps

1. create folder, cd into it
1. create the file structure
1. `npm init -y`
1. npm install express, dotenv, mongoose (and whatever else)
1. add scripts to package.json
1. add environment variables to `.env` 


### Create DB connection

### Write schema validators

### Set up routes

in each `controller`
* import express.Router
* set up each endpoint on the router
* export the router

in the `app.js`
* `require('dotenv').config()`
* import controllers and apply as middleware
* apply any other middleware such as 
  * express.json()
  * express.static('/pathToStaticFolder')
* connect to DB and set up listener
