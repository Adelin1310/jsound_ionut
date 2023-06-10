const { validateToken, getDocument } = require("../lib/auth");
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

router.post('/', async (req, res, next) => {
  try {
    const sessionID = req.cookies.sessionID;
    if (!sessionID) return res.status(200).json({ success: false })
    const session = await client.fetch(
      `*[_type == "session" && (sessionID == $sessionID)][0]`,
      { sessionID }
    )
    // Validate the token
    const decodedToken = await validateToken(session.token);
    console.log(decodedToken)
    if (decodedToken === null) return res.status(200).json({ success: false })

    res.status(200).json({
      success: true, user: {
        role: decodedToken.role.name,
        username: decodedToken.username,
        _sid:session._id
      }
    })

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router