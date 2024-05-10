// routing 
const express = require('express')

// importing post controller 
const postController = require('../controllers/postController')

const router = express.Router()

// localhost:3000/post
// get all posts
// create a post
router.route('/').get(postController.getAllPosts).post(postController.createPost)

// get one post
// delete a post
// update a post
router.route('/:id').get(postController.getOnePost).patch(postController.updatePost).delete(postController.deletePost)

// exporoting the router
module.exports = router