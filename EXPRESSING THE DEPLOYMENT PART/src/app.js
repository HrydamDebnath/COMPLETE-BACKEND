//****Server ko create karna****//

const express= require("express")

const noteModel=require("./models/note.models")


const app= express()
app.use(express.json())

app.post("/notes", async (req, res) => {

    const data = req.body /* { title,description } */
    await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "Note created"
    })

})

app.get('/notes', async (req, res) => {

    const notes = await noteModel.find() // []

    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    })

});

// app.get('/notes', async (req, res) => {

//     const notes = await noteModel.findOne({
//         title:"test_title"
//     }) // []

//     res.status(200).json({
//         message: "Notes fetched successfully",
//         notes: notes
//     })

// });




// find => [{},{}] or []
// findOne => {} or null





app.delete("/notes/:id", async (req, res) => {
    
    const id = req.params.id
    
    await noteModel.findOneAndDelete({
        _id: id
    })
    
    res.status(200).json({
        message: "Note deleted successfully"
    })
    
})


app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({ _id: id }, { description: description })

    res.status(200).json({
        message: "Note updated successfully"
    })
})










module.exports =app