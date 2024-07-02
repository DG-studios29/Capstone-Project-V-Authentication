const express = require('express');
const { viewCredentials, addCredential, updateCredential } = require('../controllers/credentialController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to view credentials of a specific division
// Requires user to be authenticated and authorized
router.get('/division/:id', authenticate, authorize, viewCredentials);

// Route to add a credential to a specific division
// Requires user to be authenticated and authorized
router.post('/division/:id', authenticate, authorize, addCredential);

// Route to update a specific credential
// Requires user to be authenticated and authorized
router.put('/credential/:id', authenticate, authorize, updateCredential);

module.exports = router;
