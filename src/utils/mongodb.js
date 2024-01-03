
const find = async(model,query,projection={}) => {
    return await model.find(query , projection);
}

const save = async (model) => {
    return await model.save();
}

const findOne = async(model,query,projection={}) => {
    return await model.findOne(query ,projection)
}

const updateOne = async(model,query , update) => {
    return await model.updateOne(query,update);
}

const deleteOne = async(model,query) =>{
    return await model.deleteOne(query);
}

module.exports ={
    find,
    save,
    findOne,
    updateOne,
    deleteOne,
}