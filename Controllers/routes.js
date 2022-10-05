const express = require("express")
const router = express.Router()
const Entry = require('../Models/entries')

// obtain all data
router.get("/", (req, res) => {
    console.log("hitting main route for entries");
    const entries = Entry.all
    console.log(1, entries);
    res.send(entries);
})

router.get("/:id", (req,res) => {
    const entry = Entry.findById(parseInt(req.params.id));
    if(!entry) {
        res.status(404).send("item not found")
    } else {
        res.send(entry);
    }
})

router.post('/', (req, res) => {
    console.log("create element route");
    const data = req.body;
    console.log(data);
    const newEntry = Entry.create(data);
    res.status(201).send(newEntry);
})

// route to add comments
router.patch('/:id/comments', (req,res) => {
    console.log("add comments route");
    const newComment = req.body.comment
    console.log(newComment);
    const entryId = parseInt(req.params.id)
    const updatedEntry = Entry.addAcomment(entryId, newComment)
    res.status(201).send(updatedEntry)
})

router.patch("/:id/reaction", (req, res) => {
    const entry = Entry.findById(parseInt(req.params.id));
    const data =req.body;
    if(!data) {
        res.send("Data not received from client.")
    } else if (!entry) {
        res.send("id not found")
    } else {
        const id = parseInt(req.params.id);
        const reaction = data.reaction;
        const updatedEntry = Entry.updateReactions(id, reaction);
        res.status(200).send(updatedEntry);
    }
})

router.patch("/:id/gif", (req, res) => {
    const entry = Entry.findById(parseInt(req.params.id));
    if(!entry) {
        res.send("item not found")
    } else {
        const data =req.body;
        const id = parseInt(req.params.id);
        const gif = data.gif;
        const updatedEntry = Entry.updateGif(id, gif);
        res.status(200).send(updatedEntry);
    }
})
router.delete("/:id/delete", (req,res) => {
    const id = parseInt(req.params.id);
    // const entryToDelete = Entry.findById(id)[0]
    // console.log(entryToDelete)
    // entryToDelete.deleteEntry()
    if(!Entry.deleteEntry(id)){
        return res.send("entry doesn't existed")
    } else {
        res.status(204)
    }
    
})
module.exports = router;
