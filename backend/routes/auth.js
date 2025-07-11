const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");

const JWT_SECRET = "Keithisagoodb$0y";

//Create a user using POST : "/api/auth/createuser". No login required
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

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //If no error create the new user
    try {
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data= {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);

      await user.save();
      res.status(201).json({ success: true, authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enter Valid/Unique data");
    }
  }
);

module.exports = router;
