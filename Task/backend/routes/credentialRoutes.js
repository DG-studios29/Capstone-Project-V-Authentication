const express = require('express');
const router = express.Router();
const { addCredential, updateCredential, getCredentialsByDivision } = require('../controllers/credentialController');
const { authenticate } = require('../middleware/authMiddleware');
const { roleCheck } = require('../middleware/roleMiddleware');

// Route to get credentials by division (accessible by all roles)
router.get('/division/:divisionId', authenticate, getCredentialsByDivision);

// Route to add a new credential to a division (normal users and above)
router.post('/division/:divisionId', authenticate, roleCheck(['normal', 'management', 'admin']), addCredential);

// Route to update a credential (management users and admin)
router.put('/:credentialId', authenticate, roleCheck(['management', 'admin']), updateCredential);

module.exports = router;
