const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const keywordsToUrls = {
    'news': ['https://news.ycombinator.com', 'https://www.bbc.com/news'],
    'sports': ['https://www.espn.com', 'https://www.sports.yahoo.com']
};

app.post('/get-urls', (req, res) => {
    const keyword = req.body.keyword;
    const urls = keywordsToUrls[keyword] || [];
    res.json(urls);
});

app.post('/download-content', async (req, res) => {
    const url = req.body.url;
    try {
        const response = await axios.get(url);
        res.json({ content: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Error downloading content' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
