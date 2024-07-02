const express = require('express');
const { assignDivision, assignOU, changeRole } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to assign a user to a division
// Only accessible by authenticated admins
router.post('/assign-division', authenticateAdmin, assignDivision);

// Route to assign a user to an OU (Organizational Unit)
// Only accessible by authenticated admins
router.post('/assign-ou', authenticateAdmin, assignOU);

// Route to change a user's role
// Only accessible by authenticated admins
router.post('/change-role', authenticateAdmin, changeRole);

module.exports = router;
