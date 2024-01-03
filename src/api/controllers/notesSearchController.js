
const notesSearchService = require("../services/notesSearchServices")

const search = async(req,res) => {
    try{
        const result = await notesSearchService.search(req);
        res.status(200).json(result);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
}

module.exports ={
    search
}