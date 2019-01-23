var express = require('express');
var router = express.Router();
const debug = require('debug')('app:posts')
const Post = require('../models/post')
const {
    ObjectID
} = require('mongodb')



/*GET Requests*/
router.get('/', async function (req, res, next) {
    try {
        let posts = await Post.find().select('-__v')
        res.status(200).send(posts)
    } catch (error) {
        let errorMessage = {
            'error': {
                'message': "There is no post to show"
            }
        }
        res.status(404).send(errorMessage)


    }

});


router.get('/:id', async function (req, res, next) {
    try {

        let id = req.params.id;


        let post = await Post.findById(id, '-__v')

        res.status(200).send(post);



    } catch (error) {
        let errorMessage = {
            'error': {
                'message': "There is no post with this id"
            }
        }
        res.status(404).send(errorMessage)

    }



});

/** POST Requests */
router.post('/', async function (req, res, next) {

    let title = req.body.title;
    let text = req.body.text;


    let post = new Post({
        title: title,
        text: text,
        createTime: Date.now()
    })
    try {
        let result = await post.save()
        res.status(200).send(result)

    } catch (error) {
        let errorMessage = {
            'error': {
                'message': "Please check the values which you sent"
            }
        }
        res.status(400).send(errorMessage)




    }




})

/** DELETE Requests */

router.delete('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let deletedPost = await Post.findByIdAndRemove(id)
        if (deletedPost === null) {
            throw new Error()
        }
        res.status(200).send(deletedPost)
    } catch (error) {
        let errorMessage = {
            'error': "There is no post with this id"
        }
        res.status(404).send(errorMessage)
    }

});

/**PUT Request */
router.put('/:id', async function (req, res, next) {
    try {
        let id = req.params.id;
        let title = req.body.title;
        let text = req.body.text;


        let post = new Post({
            _id: id,
            title: title,
            text: text,
            updateTime: Date.now()
        })
        let newPost = await Post.findByIdAndUpdate(id, post, {
            new: true,
            setDefaultsOnInsert: true
        })
        if (post === null) {
            throw new Error()
        }
        res.status(200).send(newPost)
    } catch (error) {
        let errorMessage = {
            'error': "Update failed"
        }
        res.status(400).send(errorMessage)
    }

});




module.exports = router;
