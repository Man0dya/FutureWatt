const express = require('express');
const { getAllPackages, addPackage, updatePackage, deletePackage } = require('../Controllers/PackageController');

const router = express.Router();

router.get('/', getAllPackages);
router.post('/', addPackage);
router.put('/:id', updatePackage);
router.delete('/:id', deletePackage);

module.exports = router;
