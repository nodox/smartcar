// might need to include lodash???????


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