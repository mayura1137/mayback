const express = require("express")
const { UserModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router()

userRouter.post("/register", async (req,res) => {

    const {name,email,pass} = req.body
    try {
        bcrypt.hash(pass, 5, async (err,hash) => {
            if(err) res.send({"msg": "something went wrong","error": err.massage})
            else{
                const user = new UserModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"New user has been registerd"})
            }
        });

    } catch (error) {
        res.send({ "msg": "something went wrong", "error": err.massage })
    }

})

userRouter.post("/login", async (req, res) => {
    const { email,pass} = (req.body)
    try {

        const user = await UserModel.find({email})
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, function(err, result) {
                if(result){
                    let token = jwt.sign({UserId:user[0]._id}, "masai")
                    res.send({ "msg": "Logg in", "token":token})
                    }
                    else{
                        res.send({ "msg": "wrong credentials" })
                    }
            });
            
        } else {
            res.send({ "msg": "wrong credentials" })
        }
    } catch (err) {
        res.send({ "msg": "something went wrong", "error": err.massage })
    }
    
})

module.exports = {
    userRouter
}