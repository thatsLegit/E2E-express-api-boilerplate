const app = require('./app.js');
const db = require('./db/index.js');
const dotenv = require('dotenv');

//load env vars
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Listening on port: ' + PORT);
    });
  });
