const shortId = require("shortid");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require("../../models/users");
const dbOps = require("../../utils/mongodb")

const hashPassword = async (password) => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
     
        throw new Error('Error hashing password');
    }
};

const comparePassword = async (plainTextPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    } catch (error) {
      
        throw new Error('Error comparing passwords');
    }
};


const createUser = async(userData) =>{
    const id = await shortId.generate();
    userData.userId = id;
    userData.password = await hashPassword(userData.password);
    const user = new User(userData);
    await dbOps.save(user);
    if(user.email === "test4@gmail.com"){ // Integration Test user
        dbOps.deleteOne(User , {email : userData.email});
    }
    return user;
};

const loginUser = async(userData) =>{
    const user = await dbOps.findOne(User,{email : userData.email});
    if(!user){
        throw new Error("Email or Password is wrong");
    }
    const isMatch = await comparePassword(userData.password, user.password);
    if(!isMatch){
        throw new Error("Email or Password is wrong");
    }

    const accessToken = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return({ accessToken, refreshToken });
    
};

const accessTokenGeneration = async(userData) => {
    const { refreshToken } = userData;
    if (!refreshToken)  throw new Error("token not found")

    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken =  jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        return { accessToken };
    });
}


module.exports = {
    createUser,
    loginUser,
    accessTokenGeneration,
}