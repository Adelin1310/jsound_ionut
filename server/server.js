const express = require('express');
const bodyParser = require('body-parser');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login')
const cookieParser = require('cookie-parser');
const validate = require('./routes/token')
const logoutRouter = require('./routes/logout')

const app = express();
var cors = require('cors');
app.use(cors({
  origin:"http://localhost:8080",
  credentials:true,
}))
app.use(bodyParser.json());
app.use(cookieParser())

app.use('/api/register', registerRouter);
app.use('/api/login',loginRouter)
app.use('/api/validate',validate)
app.use('/api/logout',logoutRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
