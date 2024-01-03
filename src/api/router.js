const express = require('express');
const router = express.Router();

const userRouter = require("./userRouter");
const notesCrudRouter = require("./notesCrudRouter");
const notesSearchRouter = require("./notesSearchRouter");

router.use('/api/auth',userRouter);
router.use("/api/notes" , notesCrudRouter);
router.use("/api/search" , notesSearchRouter);

router.get("/health" , (req,res)=>{
    res.send("Hello from the server");
x
})
module.exports = router

