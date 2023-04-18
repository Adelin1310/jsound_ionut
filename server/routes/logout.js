// Import necessary modules and dependencies
const express = require('express');
const sanityClient = require('@sanity/client');

// Create an Express router
const router = express.Router();

const client = sanityClient({
    projectId: 'v2mramt2',
    dataset: 'production',
    apiVersion: '2023-04-10',
    useCdn: false,
    token: "skHRQiqnO2Ad0ceeAp1p4b5fMcUKAevf5rOV0TLqrd0c3GCd3LfiXfp1088lxRzDYlmFXaKKx7ZtMZK8KOBAqqe3Aypiy8rk0yE3ooqW8XEfrse3MNx9LMn0pn44JUAP3QITJqUSvO3ivHFUl2uOZp7btOBGW6hRH6Iw6W7kZd59EVBD1oRj",
});

// Logout route
router.post('/', async (req, res) => {

    // Delete the session entry from the database
    try {
        // Get the session ID from the request, assuming it is stored in req.sessionID
        const sessionID = req.cookies.sessionID;

        const session = await client.fetch(`*[_type == 'session' && sessionID == $sessionID][0]`, { sessionID })
        // Check if session was found in Sanity
        if (!session) {
            // If session not found, send error response indicating invalid logout request
            return res.status(401).json({ error: 'Invalid logout request' });
        }

        // Delete the session entry in the Sanity database by session ID
        await client.delete(session._id);

        // Perform any other necessary tasks for logging out
        // Clear the session cookie on the client-side
        res.clearCookie('sessionID');

        // Send a response indicating successful logout
        res.status(200).json({ success: true });
    } catch (error) {
        // Handle any errors that may occur during deletion
        console.error(error);
        res.status(500).json({ error: 'Failed to delete session' });
    }
});

// Export the router
module.exports = router;
