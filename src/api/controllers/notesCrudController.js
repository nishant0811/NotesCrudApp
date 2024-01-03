const { createNotesSchema , addViewerSchema } = require("../../validators/notesValidation");
const notesCrudService = require("../services/notesCrudService");


const getNotes = async(req,res) =>{
    try{
        const notes = await notesCrudService.getNotes(req.body);
        return res.status(200).json(notes);
    }
    catch(err){
        return res.status(400).json({message : err.message});
    }
}

const getNote = async (req,res) => {
    try{
        const notes = await notesCrudService.getNote(req.params.id);
        return res.status(200).json(notes);
    }
    catch(err){
        return res.status(400).json({message : err.message});
    }
}

const createNotes = async(req,res) =>{
    const { error } = await createNotesSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try{
        const notes = await notesCrudService.createNotes(req.body);
        return res.status(200).json(notes);
    }
    catch(err){
        return res.status(400).json({message : err.message});
    }
}

const addViewer = async(req,res) => {
    const { error } = await addViewerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try{
        const notes = await notesCrudService.addViewer(req);
        return res.status(200).json(notes);
    }
    catch(err){
        return res.status(400).json({message : err.message});
    }
}

const deleteNote = async(req,res) =>{
    try{
        const notes = await notesCrudService.deleteNote(req.params.id);
        return res.status(200).json(notes);
    }
    catch(err){
        return res.status(400).json({message : err.message});
    }
}

const updateNote = async (req,res) => {
    const { error } = await createNotesSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try{
        const notes = await notesCrudService.updateNote(req);
        return res.status(200).json(notes);
    }
    catch(err){
        return res.status(400).json({message : err.message});
    }
}



module.exports = {
    getNotes,
    createNotes,
    addViewer,
    getNote,
    deleteNote,
    updateNote,
}