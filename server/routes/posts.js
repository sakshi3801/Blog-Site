const router = require("express").Router()
const User = require('../models/User')
const bcrypt = require("bcrypt")
const Post = require('../models/Post')


// CREATE POST
router.post("/", async(req, res)=>{

    const newPost = new Post(req.body)

    try{
        const savedPost = await newPost.save()
        res.status(200).send(savedPost)

    }catch(e){

        res.status(500).send(e)
    }
})

// UPDATE POST
router.put("/:id", async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id)

        if( post.username  === req.body.username){

            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
                res.status(200).send(updatedPost)
            }catch(e){
                res.status(500).send(e)
            }
        }else{
            res.status(404).send("You can only update your posts")
        }
    }catch(e){
        res.status(500).send(e)
    }
})

// DELETE
router.delete("/:id", async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id)

        if(post.username === req.body.username){

            try{

                await post.delete()
                res.status(200).send("Post deleted successfully")
            }catch(e){
                res.status(404).send(e)
            }

        }else{
            res.status(404).send("You can only delete your post")
        }
    }catch(e){
        res.status(500).send(e)
    }

})

// GET
router.get("/:id", async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id)

          
        res.status(200).send(post)

    }catch(e){

        res.status(500).send("No such post found!")
    }
})

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }

     
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router