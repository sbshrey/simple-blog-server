const express = require('express');
const router = express.Router();
const {LRUCache} = require('lru-cache');

let posts = [];
let postIdCounter = 1;



// const cache = {};
// Initialize LRU cache with a maximum of 100 items
const options = {
    max: 500,
    // how long to live in ms
    ttl: 1000 * 60 * 5,
}

const cache = new LRUCache(options)


// POST /posts - Create a new blog post
router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = { id: postIdCounter++, title, content };
    posts.push(newPost);

    // Invalidate cache when a new post is added
    cache.clear();
    
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
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // caching to optimize
    const cacheKey = `posts_${page}_${limit}`;

    // Check if the result is already in the cache
    if (cache.has(cacheKey)) {
        return res.json(cache.get(cacheKey));
    }

    const paginatedPosts = posts.slice(startIndex, endIndex);

    // Cache the result
    cache.set(cacheKey, paginatedPosts);

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

    // Invalidate cache when a post is updated
    cache.clear();

    res.json(post);
});

// DELETE /posts/:id - Delete a post
router.delete('/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    posts.splice(postIndex, 1);

    // Invalidate cache when a post is updated
    cache.clear();

    res.status(204).send();
});

module.exports = router;
