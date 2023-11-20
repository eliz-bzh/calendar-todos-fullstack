const express = require('express');
const router = express.Router();

const { driverController } = require('../controllers');

router.get('/', driverController.getAll);
router.post('/create', driverController.create);
router.delete('/delete/:id', driverController.delete);

module.exports = router;