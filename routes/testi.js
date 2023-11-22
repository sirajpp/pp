const express = require("express");
const {verifyToken} = require("../utils/verifyToken");
const { addTesti, updateTesti, deleteTesti ,getAlltestis} = require("../controllers/testicont");

const router = express.Router()
router.get('/',getAlltestis)
router.post('/new',verifyToken,addTesti)
router.put('/:id',verifyToken,updateTesti)
router.delete('/:id',verifyToken,deleteTesti);

module.exports = router;