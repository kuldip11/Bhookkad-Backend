const express =  require("express");
const router = express.Router()

const { getUserById, getUser, updateUser } = require("../controllers/user")
const {isSignedIn, isAuthenticated} = require("../controllers/auth");
const { route } = require("./auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router