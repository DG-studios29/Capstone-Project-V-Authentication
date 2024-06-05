const express = require('express');
const { assignDivision, assignOU, changeRole } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/assign-division', authenticateAdmin, assignDivision);
router.post('/assign-ou', authenticateAdmin, assignOU);
router.post('/change-role', authenticateAdmin, changeRole);

module.exports = router;
