const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const { User, validateUpdateUser} = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAuthorizationAdmin } = require("../middlewares/verifyToken")

/**
 * @desc Get all users
 * @route /api/users
 * @method GET
 * @access private (only admin)
 */
router.get("/", verifyTokenAndAuthorizationAdmin, asyncHandler( async (req, res) => {
    const users = await User.find().select("-password");

    if (!users) {
        return res.status(404).json({ message: "No users"});
    } else {
        return res.status(200).json(users)
    }

}));

/**
 * @desc Get user by id
 * @route /api/user/:id
 * @method GET
 * @access private (Only admin or the user)
 */
router.get("/:id", verifyTokenAndAuthorization, asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).json({ message: "user not found" });
    }
}));

/**
 * @desc Update user
 * @route /api/user:id
 * @method put
 * @access private
 */
router.put("/:id", verifyTokenAndAuthorization, asyncHandler( async (req, res) => {
        
    const { error } = validateUpdateUser(req.body);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
    }, {new: true}).select("-password");
    console.log(req.body)
    return res.status(200).json(updateUser);
}));

module.exports = router