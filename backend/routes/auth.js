const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Keithisagoodb$0y";

//ROUTE 1 : Create a user using POST : "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If error occurs then show the error msg
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check whether email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "A user with this email already exists" });
    }

    // hashing the password
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //If no error create the new user
    try {
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      //Creating the authentication token
      const authToken = jwt.sign(data, JWT_SECRET);

      await user.save();
      res.status(201).json({ success: true, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enter Valid/Unique data");
    }
  }
);

//ROUTE 2 : Authenticate a user using POST : "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "email cannot be blank"),
    body("password", "password cannot be blank"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If error occurs then show the error msg
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //The email and password that the user has entered
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      //Creating the authentication token
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3 : Get loggedin user details using POST : "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
