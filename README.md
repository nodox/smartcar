# README
Smartcar API implementation for GM API endpoints.

## Getting started
* Start project with `yarn install && yarn serve`
  * Assumes you have yarn installed

## Task to run
* `yarn mocha` runs the test suite
* `yarn lint` runs eslint 
* `yarn docs` runs code generator

## Schema
The API schema is written in Swagger v2.0. Follow [this link](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/nodox/smartcar/api/vehicle/swagger.yaml) to view the api.


## Core buisness logic files
* `./server/routes/` contains api routes
* `./server/controllers/` contains handlers
* `./server/helpers/` constains request transformers
* `./server/server.js` constains express server
* `./test/` contains tests of buisness logic

## Project features
Tools I used to keep this project up 
* `jsDocs` generates code documentation
* `eslint` provides a template for coding standards
* `mocha` provides a testing framework
* `chai` provides an assertion library for testing
* `./swagger.yaml` generates API documentation in a swagger editor
