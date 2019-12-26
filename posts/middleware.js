import logger from '../logger';
import {
    findById,
    findCommentById,
  } from '../data/db';

async function validateId (req, res, next) {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).json({
                error: `${id} is not a valid post id`,
            });
        }
        const post = await findById(id);
        if (post.length > 0) {
            req.post = post;
            next();
        } else {
            return res.status(404).json({ error: `Not found. No post matches the id of ${id}` });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error retrieving posts' });
    }
}

async function validatePost (req, res, next) {
    const { title, contents } = req.body;
    if (title && contents) {
        next();
    } else {
        return res.status(400).json({
            error: "missing data. 'title' and 'contents' are required"
        });
    }
}

async function validatePut (req, res, next) {
    if(Object.keys(req.body).length !== 0) {
        next();
    } else {
        return res.status(400).json({
            error: "field not specified. You must provide at least 'title' or 'content' to be edited"
        });
    }
}

async function validatePostComment (req, res, next) {
    const { text } = req.body;
    if (text) {
        // the insertComment function in db expects the comment object to have a filed post_id
        // which is the post to which the comment belongs. Instead of requiring the user to provide
        // the post_id in the body of the request, we can fetch the post id from the req.params since the 
        // the enpoint for creating new comment is '/api/post/:id/comments, where ':id' is the post id.
        req.body.post_id = req.params.id;
        next();
    } else {
        return res.status(400).json({
            error: "Missing field. 'text' field is required."
        });
    }
}

async function validateCommentId (req, res, next) {
    try {
        const { id: postId, commentId } = req.params;
        if (isNaN(Number(commentId))) {
            return res.status(400).json({
                error: `${commentId} is not a valid post id`,
            });
        }
        const [comment] = await findCommentById(commentId);
        logger.log(comment);
        console.log('postId = ', typeof(postId));
        console.log('comment.post_id = ', typeof(comment.post_id));
        if (comment && Number(comment.post_id) === Number(postId)) {
            req.comment = comment;
            next();
        } else {
            return res.status(404).json({ error: `Not found. post ${req.params.id} has no comment of id ${commentId}` });
        }
    } catch (err) {
        logger.log(err);
        return res.status(500).json({ error: 'Error retrieving post comment' });
    }
}

const postsMiddleware = {
    validateId,
    validatePost,
    validatePut,
    validatePostComment,
    validateCommentId,
};

export default postsMiddleware;
