const router = require("express").Router();
const Conversation = require("../models/Coversation");


router.post("/", async (req,res) => {

    const newConversation = new Conversation({
        members  : [req.body.senderId,req.body.receiverId]
    });

    try {

        const savedCoversation = await newConversation.save();
        res.status(200).json(savedCoversation);
    } catch(err) {
        res.status(500).json(err)
    }
})

//get a user convo

router.get("/:userId",async (req,res) => {


    try {
        const conversation = await Conversation.find({
            members : { $in:[req.params.userId]}

        });
        res.status(200).json(conversation);
        
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router