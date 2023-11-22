const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

router.get('/', userController.getAll);
router.post('/create', userController.create);
router.post('/login', userController.login);
router.get('/getUserSession', userController.getUserSession);
router.delete('/delete/:id', userController.delete);

module.exports = router;