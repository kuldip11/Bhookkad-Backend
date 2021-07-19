const { Router } = require("express")
const express = require("express")
const router = express.Router()
const { signup, signin, signout, isSignedIn } = require("../controllers/auth")
// signup router
router.post("/signup", signup);

//signin router
router.post('/signin', signin);

//signout router
router.get("/signout", signout);

module.exports = router