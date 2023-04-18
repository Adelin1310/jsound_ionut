const express = require('express');
const bcrypt = require('bcrypt');
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
  try {
    console.log(req.body)
    const { username, email, password } = req.body;
    // Check if user with the same email or username already exists
    const existingUser = await client.fetch(
      `*[_type == "user" && (username == $username || email == $email)][0]`,
      { username, email }
    );
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await client.create({
      _type: 'user',
      username,
      email,
      password: hashedPassword,
      firstName:'',
      lastName:''
    });

    res.status(200).json({success:true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
