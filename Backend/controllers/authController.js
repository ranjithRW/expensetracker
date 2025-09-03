const jwt = require("jsonwebtoken");
const User = require("../models/User");

//generatejwt token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//register user
exports.registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Request body is missing" });
    }
    const { fullName, email, password, profileImageUrl } = req.body;

    //validation
    if (!fullName || !email || !password ) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    //check if user exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        //create new user
        const user = await User.create({
            fullName, email, password, profileImageUrl,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: "error in registering user", error: error.message });
    }
};




//login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {

        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: "error in logging in user", error: error.message });
    }
 };




//get user profile
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "error in getting user info", error: error.message });
    }
 };    
