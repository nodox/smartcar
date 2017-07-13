// use strict!?

var express = require('express');
var router = express.Router();
var vehicleController = require('../controllers/vehicles.controller');

router.get('/:id', vehicleController.getVehiclesById);
router.get('/:id/doors', vehicleController.getVehiclesDoorsStatus);
router.get('/:id/fuel', vehicleController.getVehiclesFuelLevel);
router.get('/:id/battery', vehicleController.getVehiclesBatteryLevel);
router.post('/:id/engine', vehicleController.setVehiclesEngineState);

module.exports = router;