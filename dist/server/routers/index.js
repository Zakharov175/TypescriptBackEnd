"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (_, res) => {
    res.send('Hello Word');
});
router.post('/cities', controllers_1.CitiesController.createValidation, controllers_1.CitiesController.create);
router.get('/cities', controllers_1.CitiesController.getAllValidation, controllers_1.CitiesController.getAll);
router.get('/cities/:id', controllers_1.CitiesController.getByIdValidation, controllers_1.CitiesController.getById);
router.delete('/cities/:id', controllers_1.CitiesController.deleteByIdValidation, controllers_1.CitiesController.deleteById);
router.put('/cities/:id', controllers_1.CitiesController.updateByIdValidation, controllers_1.CitiesController.updateById);
