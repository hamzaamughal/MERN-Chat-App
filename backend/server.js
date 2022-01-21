const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
