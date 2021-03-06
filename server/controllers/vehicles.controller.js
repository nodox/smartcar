const axios = require('axios');
const transformer = require('../helpers/transformer');

/**
 * Returns the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesById = (req, res) => {
  const paramsDataForGM = {
    id: req.params.id.toString(),
    responseType: 'JSON',
  };

  axios.post('http://gmapi.azurewebsites.net/getVehicleInfoService', paramsDataForGM, {
    transformResponse: transformer.vehicleResponseTransformer,
  })
  .then((responseObject) => {
    res.status(200).send(responseObject.data);
  }).catch((err) => {
    res.status(400).send(err);
  });
};

/**
 * Returns the status of the doors on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesDoorsStatus = (req, res) => {
  const paramsDataForGM = {
    id: req.params.id.toString(),
    responseType: 'JSON',
  };

  axios.post('http://gmapi.azurewebsites.net/getSecurityStatusService', paramsDataForGM, {
    transformResponse: transformer.doorStatusResponseTransformer,
  })
  .then((responseObject) => {
    res.status(200).send(responseObject.data);
  }).catch((err) => {
    res.status(400).send(err);
  });
};

/**
 * Returns the fuel levels on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesFuelLevel = (req, res) => {
  const paramsDataForGM = {
    id: req.params.id.toString(),
    responseType: 'JSON',
  };

  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM, {
    transformResponse: transformer.fuelLevelsResponseTransformer,
  })
  .then((responseObject) => {
    res.send(responseObject.data);
  }).catch((err) => {
    res.status(400).send(err);
  });
};

/**
 * Returns the battery level on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const getVehiclesBatteryLevel = (req, res) => {
  const paramsDataForGM = {
    id: req.params.id.toString(),
    responseType: 'JSON',
  };

  axios.post('http://gmapi.azurewebsites.net/getEnergyService', paramsDataForGM, {
    transformResponse: transformer.batteryResponseTransformer,
  })
  .then((responseObject) => {
    res.send(responseObject.data);
  }).catch((err) => {
    res.status(400).send(err);
  });
};

/**
 * Returns the engine state on the vehicle specified by the id.
 * @param {number} id - The id of the vehicle
 */
const setVehiclesEngineState = (req, res) => {
  const commandsForGM = {
    START: 'START_VEHICLE',
    STOP: 'STOP_VEHICLE',
  };

  const action = commandsForGM[req.body.action.toString()];
  const paramsDataForGM = {
    id: req.params.id.toString(),
    command: action,
    responseType: 'JSON',
  };

  axios.post('http://gmapi.azurewebsites.net/actionEngineService', paramsDataForGM, {
    transformResponse: transformer.engineResponseTransformer,
  })
  .then((responseObject) => {
    res.status(200).send(responseObject.data);
  }).catch((err) => {
    res.status(400).send(err);
  });
};

module.exports = {
  getVehiclesById,
  getVehiclesDoorsStatus,
  getVehiclesFuelLevel,
  getVehiclesBatteryLevel,
  setVehiclesEngineState,
};
