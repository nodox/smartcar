// use strict!?

var express = require('express');
var router = express.Router();
var axios = require('axios');
var _ = require('lodash');
// var vehicleResponseTransformer = require('../helpers/transformer').vehicleResponseTransformer;

// https://github.com/swagger-api/swagger-node

/**
 * Returns the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesById = (req, res) => {

  const vehicleResponseTransformer = (response) => {
    let uncleanResponseData = JSON.parse(response).data;
    let fourDoorSedanTruthValue = JSON.parse(uncleanResponseData.fourDoorSedan.value.toLowerCase());
    let data = {};

    data.vin = uncleanResponseData.vin.value;
    data.color = uncleanResponseData.color.value;
    data.doorCount = (fourDoorSedanTruthValue == true) ? 4 : 2;
    data.driveTrain = uncleanResponseData.driveTrain.value;

    return data;
  };


  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getVehicleInfoService', paramsDataForGM, {
    transformResponse: vehicleResponseTransformer
  })
  .then(responseObject => {
    res.status(200).send(responseObject.data);
  }).catch(err => {
    res.status(400).send(err);
  });
}

/**
 * Returns the status of the doors on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesDoorsStatusById = (req, res) => {

  const doorStatusResponseTransformer = (response) => {
    let uncleanResponseData = JSON.parse(response).data.doors.values;

    let data = [];
    _.forEach(uncleanResponseData, (obj) => {
      let door = {};

      let status = JSON.parse(obj.locked.value.toLowerCase());
      door.locked = status;
      door.location = obj.location.value;
      data.push(door);

    });

    return data;
  };

  let paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getSecurityStatusService', paramsDataForGM, { 
    transformResponse: doorStatusResponseTransformer
  })
  .then(responseObject => {
    res.status(200).send(responseObject.data);
  }).catch(err => {
    res.status(400).send(err);
  });
}

/**
 * Returns the fuel levels on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesFuelLevelById = (req, res) => {

  const fuelLevelsResponseTransformer = (response) => {

    let uncleanResponseData = JSON.parse(response);
    let data = {};
    let isValueNumber = _.parseInt(uncleanResponseData.data.tankLevel.value);
    data.percent =  isValueNumber && isValueNumber != null ?  _.parseInt(uncleanResponseData.data.tankLevel.value) : 0;
    return data;
  };

  let paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM, { 
    transformResponse: fuelLevelsResponseTransformer
  })
  .then(responseObject => {
    res.send(responseObject.data);
  }).catch(err => {
    res.status(400).send(err);
  });
}

/**
 * Returns the battery level on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesBatteryLevelById = (req, res) => {

  const batteryResponseTransformer = (response) => {
    let uncleanResponseData = JSON.parse(response);
    let data = {};
    let isValueNumber = _.parseInt(uncleanResponseData.data.batteryLevel.value);
    data.percent =  isValueNumber && isValueNumber != null ? _.parseInt(uncleanResponseData.data.batteryLevel.value) : 0;
    return data;
  };


  let paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM, { 
    transformResponse: batteryResponseTransformer
  })
  .then(responseObject => {
    res.send(responseObject.data);
  }).catch(err => {
    res.status(400).send(err);
  });
}


/**
 * Returns the engine state on the vehicle specified by the id.
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
    let uncleanResponseData = JSON.parse(response);
    let data = {};
    data.status = reponsesForGM[uncleanResponseData.actionResult.status];
    return data;
  };

  axios.post('http://gmapi.azurewebsites.net/actionEngineService', paramsDataForGM, { 
    transformResponse: engineResponseTransformer
  })
  .then(responseObject => {
    res.status(200).send(responseObject.data);
  }).catch(err => {
    res.status(400).send(err);
  });
}



router.get('/:id', getVehiclesById);
router.get('/:id/doors', getVehiclesDoorsStatusById);
router.get('/:id/fuel', getVehiclesFuelLevelById);
router.get('/:id/battery', getVehiclesBatteryLevelById);
router.post('/:id/engine', setVehiclesEngineStateById);


module.exports = router;