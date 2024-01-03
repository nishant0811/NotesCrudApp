const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    ownerId : { type: String, required: true},
    id : {type : String , required : true , unique: true},
    title: { type: String, required: true },
    content: { type: String, required: true},
    sharedTo: {type : Array},
    status : {type : Number},
})

notesSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Notes', notesSchema);