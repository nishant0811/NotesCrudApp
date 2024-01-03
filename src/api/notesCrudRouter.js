const express = require('express');
const router = express.Router();
const notesCrudController = require("./controllers/notesCrudController")
const {verifyToken} = require("../middlewares/validateAccessToken");
const { hasAccessTo, isOwner } = require('../middlewares/hasAccessTo');


router.get("/" , 
    verifyToken,
    notesCrudController.getNotes
);

router.get("/:id" ,verifyToken,hasAccessTo, notesCrudController.getNote);


router.post("/" ,
    verifyToken,
    notesCrudController.createNotes
);


router.put("/:id" ,verifyToken, isOwner, notesCrudController.updateNote);

router.delete("/:id" , verifyToken, isOwner, notesCrudController.deleteNote);

router.post("/:id/share" , verifyToken, isOwner, notesCrudController.addViewer);





module.exports = router;