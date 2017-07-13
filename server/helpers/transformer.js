const _ = require('lodash');

/**
 * Returns vehicle attributes according to smart car specs
 * @param {number} id - The id of the vehicle
 */
const vehicleResponseTransformer = (response) => {
  const uncleanResponseData = JSON.parse(response).data;
  const fourDoorSedanTruthValue = JSON.parse(uncleanResponseData.fourDoorSedan.value.toLowerCase());
  const data = {};
  data.vin = uncleanResponseData.vin.value;
  data.color = uncleanResponseData.color.value;
  data.doorCount = (fourDoorSedanTruthValue === true) ? 4 : 2;
  data.driveTrain = uncleanResponseData.driveTrain.value;
  return data;
};

/**
 * Returns door status of a vehicle according to smart car specs
 * @param {number} id - The id of the vehicle
 */
const doorStatusResponseTransformer = (response) => {
  const uncleanResponseData = JSON.parse(response).data.doors.values;

  const data = [];
  _.forEach(uncleanResponseData, (obj) => {
    const door = {};
    const status = JSON.parse(obj.locked.value.toLowerCase());
    door.locked = status;
    door.location = obj.location.value;
    data.push(door);
  });
  return data;
};

/**
 * Returns fuel levels of a vehicle according to smart car specs
 * @param {number} id - The id of the vehicle
 */
const fuelLevelsResponseTransformer = (response) => {
  const uncleanResponseData = JSON.parse(response);
  const data = {};
  const isValueNumber = _.parseInt(uncleanResponseData.data.tankLevel.value);
  data.percent = isValueNumber && isValueNumber != null ?
                  _.parseInt(uncleanResponseData.data.tankLevel.value) : 0;
  return data;
};


/**
 * Returns battery levels of a vehicle according to smart car specs
 * @param {number} id - The id of the vehicle
 */
const batteryResponseTransformer = (response) => {
  const uncleanResponseData = JSON.parse(response);
  const data = {};
  const isValueNumber = _.parseInt(uncleanResponseData.data.batteryLevel.value);

  data.percent = isValueNumber && isValueNumber != null ?
                  _.parseInt(uncleanResponseData.data.batteryLevel.value) : 0;
  return data;
};


/**
 * Returns engine status after action occurs on a vehicle according to smart car specs
 * @param {number} id - The id of the vehicle
 */
const engineResponseTransformer = (response) => {
  const reponsesForGM = {
    EXECUTED: 'success',
    FAILED: 'error',
  };

  const uncleanResponseData = JSON.parse(response);
  const data = {};
  data.status = reponsesForGM[uncleanResponseData.actionResult.status];
  return data;
};


module.exports = {
  vehicleResponseTransformer,
  doorStatusResponseTransformer,
  fuelLevelsResponseTransformer,
  batteryResponseTransformer,
  engineResponseTransformer,
};
