const User = require("../models/user")
const jwt = require("jsonwebtoken")
var expressJwt = require("express-jwt")

//signup
exports.signup = (req, res) => {
    try {
      const user = new User(req.body);
      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "NOT able to save user in DB",
          });
        }
        return res.status(200).json({
          name: user.name,
          email: user.email,
          id: user._id,
        });
      });
    } catch {
      return res.status(400).json({
        error: "Error in SignUp",
      });
    }
  }

//signin  
exports.signin = (req, res) => {
  
  try{
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    // return res.status(200).json({msg:User})
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
  


    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
    });
}catch{
  return res.status(400).json({
    error:"Error in Signin"
  })
}
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout successfully",
    });
  };

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ["HS256"],
  });
  
//custom middlewares
  exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED",
      });
    }
    next();
  };