const Notes = require("../../models/notes");
const dbOps = require("../../utils/mongodb");

const search = async(req) => {
    const searchQuery = req.query.q;
    const userId = req.body.userId;
    const notes = dbOps.find(Notes,{ ownerId : userId, $text: { $search: searchQuery } , status :1 });
    return notes;
}

module.exports = {
    search
}