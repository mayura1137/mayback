const express=require("express")

const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.route")
const {authenticate}=require("./middlewares/auth.middle")
const cors=require("cors")

require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.PORT,async()=>{
try{
    await connection
    console.log("connect to DB")

}catch(error){
    console.log(error.massage)
}

    console.log("server is running at PORT 3484")
})
