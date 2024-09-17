const express = require('express');
const router = express.Router();
const { assignUserToDivision, removeUserFromDivision } = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Only admins can assign/unassign users and manage roles
router.post('/assign', authenticate, authorize(['admin']), assignUserToDivision);
router.post('/remove', authenticate, authorize(['admin']), removeUserFromDivision);

module.exports = router;
