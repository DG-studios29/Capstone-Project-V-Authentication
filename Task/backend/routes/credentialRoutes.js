const express = require('express');
const { viewCredentials, addCredential, updateCredential } = require('../controllers/credentialController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/division/:id', authenticate, authorize, viewCredentials);
router.post('/division/:id', authenticate, authorize, addCredential);
router.put('/credential/:id', authenticate, authorize, updateCredential);

module.exports = router;
