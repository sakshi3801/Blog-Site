const router = require("express").Router()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const Post = require('../models/Post')

// Update 
router.put("/:id", async(req,res)=>{

    if(req.body.userId === req.params.id){
        
        console.log("sakshi")
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).send(updatedUser)
            
        }catch{
            res.status(500).json(err)
        }

    }else{
        res.status(401).send("You can update only your profile")
    }

})

//DELETE
router.delete("/:id", async(req,res)=>{

    if(req.body.userId === req.params.id){

    
    try{

        const user = await User.findById(req.params.id)
                                                        
        try{
            await Post.deleteMany({username: user.username})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).send("User has been deleted!")
        }catch(e){
            res.status(500).json(e)
        }
    }catch(e){

        res.status(404).send("User not found")
    }} else{
        res.status(401).json("You can delete only your account")
    }
})

// GET
router.get("/:id", async(req,res)=>{

    try{

        const user = await User.findById(req.params.id)
        
        const {password, ...others} = user._doc

        res.status(200).send(others)

    }catch(e){

        res.status(500).send("No such user found!")
    }
})


module.exports = router