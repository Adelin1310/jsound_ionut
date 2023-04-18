const jwt = require('jsonwebtoken');

const JWT_SECRET = 'gasd3$213!!@';

const validateToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    return null
  }
}

function createUserToken(user) {
  const token = jwt.sign({ username: user.username, role: user.role, userId: user._id }, JWT_SECRET, { expiresIn: '30d' });
  return token;
}

async function getDocument(client, query, params) {
  const documents = await client.fetch(query, params);
  return documents;
}



module.exports = {
  createUserToken, getDocument, validateToken
};
