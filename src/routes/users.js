const express = require('express');
const ConectToDB = require('../middlewares/ConnectDB');
const router = express.Router();

/* GET users listing. */
router.get('/', ConectToDB, async function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
