const dbOps = require("../utils/mongodb")
const Notes = require("../models/notes")
const hasAccessTo = async (req, res, next) => {
    try{
        const sharedList = (await dbOps.findOne(Notes,{id : req.params.id, status : 1},{sharedTo : 1}))?.sharedTo;
    
        if(!sharedList.includes(req.body.userId)){
            return res.status(503).json({message : "Access Denied"})
        }
        next();
    }
    catch(err){
        console.log(err.message);
        return res.status(503).json({message : "Access Denied"})
    }
   
};

const isOwner = async(req,res,next) => {
    const ownerId = (await dbOps.findOne(Notes,{id : req.params.id},{ownerId : 1})).ownerId;

    if(ownerId !== req.body.userId){
        return res.status(503).json({message : "Access Denied"})
    }
    next();
}
module.exports = {
    hasAccessTo,
    isOwner
}