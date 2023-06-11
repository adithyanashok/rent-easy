import { createError } from "../error.js"
import Property from "../models/Property.js"


// first create a post
export const CreatePost = async (req, res, next) => {
    try {
        console.log(req.body)
        const newPost = await Property({ ...req.body })
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        console.log(error)

    }
}
// Fetching all posts
export const FetchPosts = async (req, res, next) => {
    console.log(req.user)
    try {
        const post = await Property.find()
        res.status(200).json(post)
    } catch (err) {
        console.log(err)

    }
}

// Fetch post of a user

export const FetchUserPosts = async (req, res, next) => {
    console.log(req.user)
    try {
        const post = await Property.find({userId: req.params.id})
        res.status(200).json(post)
    } catch (err) {
        console.log(err)

    }
}

// Fetching single post

export const FetchPost = async (req, res, next) => {
    console.log(Property)
    try {
        const post = await Property.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        console.log(error)

    }
}

// Delete Post

export const DeletePost = async (req, res, next) => {
    console.log("userId: " + req.user.id)
    try {
        console.log(Property.userId)
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            const post = await Property.findById(req.params.id)
            console.log(post)

            if (!post) return next(createError(404, "Post Not found"))

            if (req.user.id === post.userId) {

                await Property.findByIdAndDelete(req.params.id)
            } else {
                return next(createError(404, "This is not your video to delete"))
            }
        }
        res.status(200).json("Deleted")
    } catch (error) {
        console.log(error)

    }
}
// Update Property

export const UpdateProperty = async (req, res, next) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            const property = await Property.findById(req.params.id)

            if (!property) return next(createError(404, "Post Not found"))

            if (req.user.id === property.userId) {

                const updatedproperty = await Property.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedproperty)
            } else {
                return next(createError(404, "This is not your video to update"))
            }
        }
    } catch (error) {
        console.log(error)

    }
}