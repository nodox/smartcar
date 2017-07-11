var express = require('express');
var router = express.Router();
var axios = require('axios');

// Documents the API paths
// https://github.com/swagger-api/swagger-node

/**
 * Returns the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesById = (req, res) => {

  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getVehicleInfoService', paramsDataForGM)
  .then(responseObject => {
    res.send(responseObject.data);
  }).catch(err => {
    console.log(err);
  });
}

/**
 * Returns the status of the doors on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesDoorsStatusById = (req, res) => {
  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getSecurityStatusService', paramsDataForGM)
  .then(responseObject => {
    res.send(responseObject.data);
  }).catch(err => {
    console.log(err);
  });
}

/**
 * Returns the fuel levels on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesFuelLevelById = (req, res) => {
  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM)
  .then(responseObject => {
    res.send(responseObject.data);
  }).catch(err => {
    console.log(err);
  });
}

/**
 * Returns the ........ on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesBatteryLevelById = (req, res) => {
  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM)
  .then(responseObject => {
    res.send(responseObject.data);
  }).catch(err => {
    console.log(err);
  });
}


/**
 * Returns the ........ on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const setVehiclesEngineStateById = (req, res) => {
  var paramsDataForGM = { 'id': req.params.id.toString(), "command": "START_VEHICLE", "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/actionEngineService', paramsDataForGM)
  .then(responseObject => {
    res.send(responseObject.data);
  }).catch(err => {
    console.log(err);
  });
}



router.get('/:id', getVehiclesById);
router.get('/:id/doors', getVehiclesDoorsStatusById);
router.get('/:id/fuel', getVehiclesFuelLevelById);
router.get('/:id/battery', getVehiclesBatteryLevelById);
router.post('/:id/engine', setVehiclesEngineStateById);


module.exports = router;