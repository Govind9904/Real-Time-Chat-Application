const User = require("../Models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerUser = async (req,res) =>{
    const { name , email , password } = req.body;

    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password , salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })

        res.status(201).json({ msg: "User registered successfully", user });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.loginUser = async (req,res) => {
    const { email , password } = req.body;

    try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({msg : "User not found"});

        const isMatch = await bcrypt.compare(password , user.password);

        const token = jwt.sign({ id : user._id } , process.env.JWT_SECRET,{expiresIn : "3h"});
         res.json({ msg: "Login successful", user , token});
    }
    catch (error) {
            res.status(500).json({ error: error });
    }          
} 