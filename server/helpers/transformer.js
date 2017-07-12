var _ = require('lodash');

/**
 * Returns ........
 * @param {number} id - The id of the vehicle
 */
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

/**
 * Returns ........
 * @param {number} id - The id of the vehicle
 */
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

/**
 * Returns ........
 * @param {number} id - The id of the vehicle
 */
const fuelLevelsResponseTransformer = (response) => {
  let uncleanResponseData = JSON.parse(response);
  let data = {};
  let isValueNumber = _.parseInt(uncleanResponseData.data.tankLevel.value);
  data.percent =  isValueNumber && isValueNumber != null ?  _.parseInt(uncleanResponseData.data.tankLevel.value) : 0;
  return data;
};


/**
 * Returns ........
 * @param {number} id - The id of the vehicle
 */
const batteryResponseTransformer = (response) => {
  let uncleanResponseData = JSON.parse(response);
  let data = {};
  let isValueNumber = _.parseInt(uncleanResponseData.data.batteryLevel.value);
  data.percent =  isValueNumber && isValueNumber != null ? _.parseInt(uncleanResponseData.data.batteryLevel.value) : 0;
  return data;
};


/**
 * Returns ........
 * @param {number} id - The id of the vehicle
 */
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


module.exports = {
  vehicleResponseTransformer,
  doorStatusResponseTransformer,
  fuelLevelsResponseTransformer,
  batteryResponseTransformer,
  engineResponseTransformer,
};