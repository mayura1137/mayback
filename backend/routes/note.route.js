const express=require("express")
const {noteModel}=require("../model/note.model")

const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    const notes=await noteModel.find({})
    res.send("notes")
})

noteRouter.post("/create",async(req,res)=>{
    const playload=req.body
    const note= new noteModel(playload)
    await note.save()
    res.send({"msg":"Note Created"})
})


noteRouter.patch("/update/:id", async (req, res) => {
    try {
        await noteModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.send({ massage: `Note is update` })
    } catch (error) {
        res.send({ Error: `for this ${error}` })
    }
})

noteRouter.delete("/delete:id",async(req,res)=>{
    const noteId=req.params.id
    await noteModel.findByIdAndDelete({_id:noteId})
    res.send({"msg":`Note with id: ${noteId} has been delered`})
})


module.exports={
    noteRouter
}