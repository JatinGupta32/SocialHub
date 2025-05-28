const express = require("express");
const router = express.Router();
const {auth} = require('../middlewares/auth');
const { createGroup,getGroups,createPrivateChat,getUser1,getGroupMessage,getPrivateMessage,saveGroupPhoto, saveGroupName} = require("../controllers/Message");

// Multer setup for handling file uploads in memory
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/createGroup",auth,createGroup);
router.post("/createPrivateChat",auth,createPrivateChat);
router.get("/getGroups",auth,getGroups);
router.get("/getUser1",auth,getUser1);
router.get("/getGroupMessage",auth,getGroupMessage);
router.get("/getPrivateMessage",auth,getPrivateMessage);
router.post("/saveGroupPhoto", auth, upload.single("imageFile"), saveGroupPhoto);
router.post("/saveGroupName", auth, saveGroupName);


module.exports = router;