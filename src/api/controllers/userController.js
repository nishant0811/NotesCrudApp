
const userServices = require("../services/userServices")
const {createUserSchema , loginUserSchema} = require("../../validators/userValidation");

const createUser = async (req,res) =>{
    const { error } = await createUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try{
        const user = await userServices.createUser(req.body);
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
};


const loginUser = async(req,res) => {
    const { error } = await loginUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try{
        const user = await userServices.loginUser(req.body);
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({message:err.message});
        console.log(err);
    }
}

const refreshtoken = async(req,res) => {
    try{
        const token = await userServices.accessTokenGeneration(req.body);
        res.status(200).json(token);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
}

module.exports = {
    createUser,
    loginUser,
    refreshtoken,

}

