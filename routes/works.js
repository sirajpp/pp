const express  = require("express");
const {verifyToken} = require("../utils/verifyToken");
const { getAllworks, addwork, deletework } = require("../controllers/workcont");

const router = express.Router()


router.get('/',getAllworks)
router.post('/new',verifyToken,addwork);
router.delete('/:id',verifyToken,deletework)


module.exports = router