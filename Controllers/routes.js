const express = require("express")
const router = express.Router()
const Entry = require('../Models/entries')

module.exports = router

// obtain all data
router.get("/", (req, res) => {
    console.log("hitting main route for entries");
    const entries = Entry.all
    console.log(1, entries);
    res.send(entries);
})

router.get("/:id", (req,res) => {
    const entry = Entry.findById(parseInt(req.params.id))
    if(!entry) {
        res.send("item not found")
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



module.exports = router;

