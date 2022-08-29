const asyncHandler = require('express-async-handler');

const Dream = require('../models/dreamModel');
const User = require('../models/userModel');

const getPosts = asyncHandler(async (req, res) => {
    const dreams = await Dream.find({user: req.user.id})
    res.status(200).json(dreams)
})

const addPost = asyncHandler(async (req, res) => {
    const message = req.body.text;

    if (!req.body.title) {
        throw new Error("Please enter a title!")
    }

    if (!req.body.text) {
        throw new Error("Please type your dream!")
    }

    const dream = await Dream.create({
        user: req.user._id,
        title: req.body.title,
        text: req.body.text,
    })

    res.status(200).json(dream)
    
})

const updatePost = asyncHandler(async (req, res) => {
    const dream = await Dream.findById(req.params.id)
    if(!dream) {
        throw new Error("This dream doesn't exist!")
        res.status(400)
    }


    if (!req.user) {
        throw new Error('Not logged in');
    } 
    

    
    if (req.user.id !== dream.user.toString()) {
        res.status(401);
        console.log(user.id, dream.user.toString())
        throw new Error('You are not allowed to edit this post!');
    }

    const updatedDream = await Dream.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedDream)
})

const deletePost = asyncHandler(async (req, res) => {
    const dream = await Dream.findById(req.params.id);

    if(!dream) {
        throw new Error("This dream doesn't exist!");
        res.status(400);
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        throw new Error('Not logged in');
    } 
    
    if (user.id !== dream.user.toString()) {
        res.status(401);
        throw new Error('You are not allowed to delete this post!');
    }

    dream.deleteOne();

    res.status(200).json({
        message: "Deleted",
        id: req.params.id
    })
})

module.exports = {
    getPosts, 
    addPost, 
    updatePost, 
    deletePost,
}