import { Router } from 'express';
import { createBlog, listBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';

import authMiddleware from '../middlewares/auth.js';
import { upload } from '../utils/uploader.js'



const router = Router();


/** 
 * @openapi
 * /api/blogs:
 *   get:
 *    summary: Get all blogs
 *    tags: [Blogs]
 *    responses:
 *      200: 
 *        description: Success
 */
router.get('/', listBlogs);



/**
 * @openapi
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Blog not found
 */
router.get('/:id', getBlog);





/**
 * @openapi
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags:
 *       - Blogs
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *
 *             required:
 *               - title
 *               - content
 *
 *             properties:
 *               title:
 *                 type: string
 *
 *               content:
 *                 type: string
 *
 *               image:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       201:
 *         description: Blog created successfully
 *
 *       400:
 *         description: Invalid request data
 */
router.post('/', authMiddleware, upload.single('image'), createBlog);


/**
 * @openapi
 * /api/blogs/{id}:
 *   patch:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch('/:id',authMiddleware, upload.single('image'), updateBlog);




/**
 * @openapi
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', authMiddleware, deleteBlog);

export default router;