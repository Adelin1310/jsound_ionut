const express = require('express');
const sanityClient = require('@sanity/client');
const router = express.Router();

const client = sanityClient({
    projectId: 'v2mramt2',
    dataset: 'production',
    apiVersion: '2023-04-10',
    useCdn: false,
    token: "skHRQiqnO2Ad0ceeAp1p4b5fMcUKAevf5rOV0TLqrd0c3GCd3LfiXfp1088lxRzDYlmFXaKKx7ZtMZK8KOBAqqe3Aypiy8rk0yE3ooqW8XEfrse3MNx9LMn0pn44JUAP3QITJqUSvO3ivHFUl2uOZp7btOBGW6hRH6Iw6W7kZd59EVBD1oRj",
});

router.post('/', async (req, res) => {
    const { _productId, _sessionId } = req.body
    try {
        client
            .patch(_sessionId)
            .setIfMissing({ products: [] })
            .insert('after', 'products[-1]', [_productId])
            .commit({ autoGenerateArrayKeys: true })
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
})

router.post('/getRecommendations', async (req, res) => {
    const { _productId } = req.body
    try {
        const query = `*[_type == "session" && "${_productId}" in products]{products}`
        const sessions = await client.fetch(query)
        let products = []
        sessions.forEach(s => {
            s.products.forEach(p=>products.push(p))
        })
        products = sortByFrequency(products)
        recommendations = await client.getDocuments(products)
        return res.json(recommendations).status(200)
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    }
})
function sortByFrequency(array) {
    var frequency = {};

    array.forEach(function (value) { frequency[value] = 0; });

    var uniques = array.filter(function (value) {
        return ++frequency[value] == 1;
    });

    return uniques.sort(function (a, b) {
        return frequency[b] - frequency[a];
    });
}
module.exports = router;