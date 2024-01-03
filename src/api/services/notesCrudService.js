const shortid = require("shortid");
const Notes = require("../../models/notes")
const User = require("../../models/users")
const dbOps = require("../../utils/mongodb")



const getNotes = async(data) => {
    const notes = await dbOps.find(Notes,{ownerId : data.userId , status : 1},{id:1,title:1});
    return notes;

};

const getNote = async(id) => {
    const note = await dbOps.findOne(Notes,{id , status : 1},{title:1,content : 1});
    return note;
}

const createNotes = async(data) =>{
    const id = shortid.generate();
    const payload = {};
    payload.id = id;
    payload.title = data.title;
    payload.content = data.content;
    payload.sharedTo = [data.userId];
    payload.ownerId = data.userId;
    payload.status = 1;

    const notes = new Notes(payload);
    await dbOps.save(notes);
    return notes;
}

const addViewer  = async(req) => {
    const postId = req.params.id;
    const data = req.body;
    const userId = (await dbOps.findOne(User,{email : data.email}, {userId : 1})).userId;
    const accessList = (await dbOps.findOne(Notes, {id : postId} , {sharedTo : 1})).sharedTo;
    accessList.push(userId);

    return await dbOps.updateOne(Notes,{id : postId} , {sharedTo : accessList});
}

const deleteNote = async(id) =>{
    return await dbOps.updateOne(Notes,{id},{status : 0});
}

const updateNote = async(req) =>{
    data = req.body;
    return await dbOps.updateOne(Notes,{id : req.params.id, status : 1} , {title: data.title , content : data.content});
}


module.exports = {
    getNotes,
    createNotes,
    addViewer,
    getNote,
    deleteNote,
    updateNote
}