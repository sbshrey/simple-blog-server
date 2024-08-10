const API_KEY = 'your-api-key';

const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === API_KEY) {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};

module.exports = authenticate
