import express from 'express';
import postsMiddleware from './middleware';
import postsController from './controller';

const {
    validateId,
    validatePost,
    validatePut,
    validatePostComment,
    validateCommentId,
} = postsMiddleware;

const {
    findAllPosts,
    findPostById,
    createNewPost,
    editPost,
    deletePost,
    getPostComments,
    createNewComment,
    getCommentById,
} = postsController;

const router = express.Router();

router.get('/', findAllPosts);
router.get('/:id', validateId, findPostById);
router.post('/', validatePost, createNewPost);
router.put('/:id', validateId, validatePut, editPost);
router.delete('/:id', validateId, deletePost);

router.get('/:id/comments', validateId, getPostComments);
router.post('/:id/comments', validateId, validatePostComment, createNewComment);
router.get('/:id/comments/:commentId', validateCommentId, getCommentById);


export default router;
