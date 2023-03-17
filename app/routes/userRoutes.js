const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
router.get('/v1/view', userController.viewAdmins);
router.get('/v1/edit', userController.editAdmin);
router.get('/v1/update', userController.updateAdmin);
router.get('/v1/add', userController.addAdmin);


module.exports = router;
