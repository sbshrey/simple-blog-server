const express = require('express');
const router = express.Router();

let posts = [
    {
        'id': 1,
        'title': 'Hello',
        'content': 'Hello World!'
    }
];
let postIdCounter = 2;

const cache = {};

// POST /posts - Create a new blog post
router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = { id: postIdCounter++, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// GET /posts/:id - Retrieve a specific post
router.get('/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
});

// GET /posts - List all posts (with pagination)
router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    // caching to optimize
    const cacheKey = `posts_${page}_${limit}`;

    if (cache[cacheKey]) {
        return res.json(cache[cacheKey]);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedPosts = posts.slice(startIndex, endIndex);
    res.json(paginatedPosts);
});

// PUT /posts/:id - Update a post
router.put('/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;

    res.json(post);
});

// DELETE /posts/:id - Delete a post
router.delete('/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    posts.splice(postIndex, 1);
    res.status(204).send();
});

module.exports = router;
