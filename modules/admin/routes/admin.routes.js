const router = require('express').Router();
const { allUsers } = require('./../controller/admin.controller')
const authmiddleware = require('./../../../middlewares/auth.middleware')

router.get("/allUsers", authmiddleware, allUsers);

module.exports = router