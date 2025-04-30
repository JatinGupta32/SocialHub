const express = require("express");
const router = express.Router();
const {auth} = require('../middlewares/auth');
const { createGroup,getGroups,createPrivateChat,getUser1,getGroupMessage,getPrivateMessage} = require("../controllers/Message");

router.post("/createGroup",auth,createGroup);
router.post("/createPrivateChat",auth,createPrivateChat);
router.get("/getGroups",auth,getGroups);
router.get("/getUser1",auth,getUser1);
router.get("/getGroupMessage",auth,getGroupMessage);
router.get("/getPrivateMessage",auth,getPrivateMessage);


module.exports = router;