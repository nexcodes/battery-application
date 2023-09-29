const routes = require("express").Router()
const controller = require('../Controller/controller.js')
routes.route('/api/brand').post(controller.createBrand).get(controller.getBrand).delete(controller.deleteBrand)
routes.route('/api/battery').post(controller.createBattery).get(controller.getBattery).delete(controller.deleteBattery)
module.exports = routes