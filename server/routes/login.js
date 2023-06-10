const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const sanityClient = require('@sanity/client');
const { createUserToken, getDocument } = require('../lib/auth');

const router = express.Router();

const client = sanityClient({
  projectId: 'v2mramt2',
  dataset: 'production',
  apiVersion: '2023-04-10',
  useCdn: false,
  token: "skHRQiqnO2Ad0ceeAp1p4b5fMcUKAevf5rOV0TLqrd0c3GCd3LfiXfp1088lxRzDYlmFXaKKx7ZtMZK8KOBAqqe3Aypiy8rk0yE3ooqW8XEfrse3MNx9LMn0pn44JUAP3QITJqUSvO3ivHFUl2uOZp7btOBGW6hRH6Iw6W7kZd59EVBD1oRj",
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await getDocument(
      client,
      `*[_type == "user" && (email == $email || username == $email)][0]{
        ...,
        role->
      }`,
      { email }
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }


    // Check if passwords match
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // If they don't, send error and Unauthorized HTTP Error Code Response
    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    // Create new token and hex sessionID
    const token = createUserToken(user);
    const sessionID = crypto.randomBytes(16).toString('hex')

    // Create a session 
    const newSession = await client.create({
      _type: 'session',
      sessionID,
      token,
      userId: user._id
    });


    // Send the session ID to the client in an HTTP-only cookie
    return res.cookie('sessionID', newSession.sessionID, { httpOnly: true , origin:'localhost:3000', sameSite: 'lax', secure:false }).status(200).json({
      success: true, user: {
        role: user.role.name,
        username: user.username,
        _sid: newSession._id
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error
    });
  }
});

module.exports = router;
