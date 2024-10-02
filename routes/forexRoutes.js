const express = require("express");
const router = express.Router();
const forexController = require("../controllers/forexController");
// POST endpoint to query forex data
router.post("/forex-data", forexController.getForexData);

module.exports = router;
