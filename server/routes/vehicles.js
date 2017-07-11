// use strict!?

var express = require('express');
var router = express.Router();
var axios = require('axios');
var _ = require('lodash');

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

  const doorStatusResponseTransformer = (response) => {
    var uncleanResponseData = JSON.parse(response).data.doors.values;

    var data = [];
    _.forEach(uncleanResponseData, (obj) => {
      var door = {};

      var status = JSON.parse(obj.locked.value.toLowerCase());
      door.locked = status;
      door.location = obj.location.value;
      data.push(door);

    });

    return data;
  };

  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getSecurityStatusService', paramsDataForGM, { 
    transformResponse: doorStatusResponseTransformer
  })
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

  const fuelLevelsResponseTransformer = (response) => {
    var data = {};
    data.percent = JSON.parse(response).data.tankLevel.value;
    return data;
  };

  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM, { 
    transformResponse: fuelLevelsResponseTransformer
  })
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

  const batteryResponseTransformer = (response) => {
    var data = {};
    data.percent = JSON.parse(response).data.batteryLevel.value;
    return data;
  };


  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM, { 
    transformResponse: batteryResponseTransformer
  })
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

  // XSS protection needed
  const commandsForGM = {
    "START": "START_VEHICLE",
    "STOP": "STOP_VEHICLE"
  }

  let action = commandsForGM[req.body.action.toString()];
  var paramsDataForGM = { 'id': req.params.id.toString(), "command": action, "responseType": "JSON" };


  const engineResponseTransformer = (response) => {
    const reponsesForGM = {
      "EXECUTED": "success",
      "FAILED": "error"
    }
    var responseData = JSON.parse(response);
    var data = {};
    data.status = reponsesForGM[responseData.actionResult.status];
    return data;
  };

  axios.post('http://gmapi.azurewebsites.net/actionEngineService', paramsDataForGM, { 
    transformResponse: engineResponseTransformer
  })
  .then(responseObject => {
    res.status(200).send(responseObject.data);
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