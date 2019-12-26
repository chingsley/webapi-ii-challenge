import logger from '../logger';
import {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment,
  } from '../data/db';

const findAllPosts = async (req, res) => {
    try {
        const posts = await find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failded to retrieve posts' });
    }
};

const findPostById = async (req, res) => {
    res.status(200).json(req.post);
}

const createNewPost = async (req, res) => {
    try {
        const result = await insert(req.body);
        const { id } = result;
        const createdPost = await findById(id);
        return res.status(200).json({
            message: 'Post successfully created',
            post: createdPost,
        })
    } catch (err) {
        res.status(500).json({ error: 'Server error. Failed to create post' });
    }
};

const editPost = async (req, res)  => {
    logger.log(req.body);
    try {
        const { id } = req.params;
        const result = await update(id, req.body);
        logger.log(result);
        if (result === 1) {
            const updatedPost = await findById(id);
            return res.status(200).json({
                message: 'Post successfully updated',
                post: updatedPost,
            });
        } else {
            return res.status(500).json({ error: 'Update failed' });
        }
    } catch (err) {
        logger.log(err);
        res.status(500).json({ error: 'Server error. Failed to update' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await remove(id);
        res.status(200).json({
            message: 'Post successfully deleted',
        });
    } catch(err) {
        logger.log(err);
        res.status(500).json({ error: 'Server error. Failed to delete' });
    }
};

const getPostComments = async (req, res) => {
    const comments = await findPostComments(req.params.id);
    return res.status(200).json({ comments })
};

const createNewComment = async (req, res) => {
    const { id: postId } = req.params;
    const { body: newComment } = req;
    try {
        const result = await insertComment(newComment)
        return res.status(201).json({
            message: 'Comment successfully added.',
            result: result,
        })
    } catch (err) {
        logger.log(err);
        return res.status(500).json({
            error: 'Server error. Failed to add comment',
        })
    }
};

const getCommentById = async (req, res) => {
    return res.status(200).json(req.comment);
};

const postsController = {
    findAllPosts,
    findPostById,
    createNewPost,
    editPost,
    deletePost,
    getPostComments,
    createNewComment,
    getCommentById,
};

export default postsController;
