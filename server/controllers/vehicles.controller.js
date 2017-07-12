var axios = require('axios');
var transformer = require('../helpers/transformer');

/**
 * Returns the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesById = (req, res) => {
  var paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getVehicleInfoService', paramsDataForGM, {
    transformResponse: transformer.vehicleResponseTransformer
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
const getVehiclesDoorsStatus = (req, res) => {
  let paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getSecurityStatusService', paramsDataForGM, { 
    transformResponse: transformer.doorStatusResponseTransformer
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
const getVehiclesFuelLevel = (req, res) => {
  let paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM, { 
    transformResponse: transformer.fuelLevelsResponseTransformer
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
const getVehiclesBatteryLevel = (req, res) => {
  let paramsDataForGM = { 'id': req.params.id.toString(), "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM, { 
    transformResponse: transformer.batteryResponseTransformer
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
const setVehiclesEngineState = (req, res) => {

  // XSS protection needed??
  const commandsForGM = {
    "START": "START_VEHICLE",
    "STOP": "STOP_VEHICLE"
  };

  let action = commandsForGM[req.body.action.toString()];
  var paramsDataForGM = { 'id': req.params.id.toString(), "command": action, "responseType": "JSON" };
  axios.post('http://gmapi.azurewebsites.net/actionEngineService', paramsDataForGM, { 
    transformResponse: transformer.engineResponseTransformer
  })
  .then(responseObject => {
    res.status(200).send(responseObject.data);
  }).catch(err => {
    res.status(400).send(err);
  });
}





module.exports = {
  getVehiclesById,
  getVehiclesDoorsStatus,
  getVehiclesFuelLevel,
  getVehiclesBatteryLevel,
  setVehiclesEngineState
};