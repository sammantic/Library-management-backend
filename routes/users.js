const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const { User, validateUpdateUser} = require("../models/User");
const { verifyToken } = require("../middlewares/verifyToken")


/**
 * @desc Update user
 * @route /api/user:id
 * @method put
 * @access private
 */
router.put("/:id", verifyToken, asyncHandler( async (req, res) => {
    
    if (req.user.id !== req.params.id ){
        res.status(403).json({ message: "Your are not allowed, you can only update your profile"});
    }
    
    const { error } = validateUpdateUser(req.body);
    
    if (error) {
        res.status(400).json({ message: error.details[0].message });
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
    res.status(200).json(updateUser);
}));

module.exports = router