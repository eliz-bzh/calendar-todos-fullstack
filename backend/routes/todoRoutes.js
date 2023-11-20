const express = require('express');
const router = express.Router();

const { todoController } = require('../controllers');

router.get('/', todoController.getAll);
router.post('/create', todoController.create);
router.delete('/delete/:id', todoController.delete);

module.exports = router;