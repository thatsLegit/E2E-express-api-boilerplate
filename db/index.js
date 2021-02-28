const mongoose = require('mongoose');
let mongod;

function connect() {
  return new Promise(async (resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {
      const { MongoMemoryServer } = require('mongodb-memory-server');

      mongod = new MongoMemoryServer({
        dbName: 'testing-mongodb-mock', // by default generate random dbName
      });

      const uri = await mongod.getUri();
      // const port = await mongod.getPort();
      // const dbPath = await mongod.getDbPath();
      // const dbName = await mongod.getDbName();

      // some code
      //   ... where you may use `uri` for as a connection string for mongodb or mongoose
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }).then((res, err) => {
        if (err) return reject(err);
        resolve();
      });

      // you may check instance status, after you got `uri` it must be `true`
      // console.log(mongod.getInstanceInfo()); // return Object with instance data

      // even you forget to stop `mongod` when you exit from script
      // special childProcess killer will shutdown it for you
    } else {
      mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }).then((res, err) => {
        if (err) return reject(err);
        resolve();
      })
    }
  });
}

async function close() {
  await mongod.stop();
  return mongoose.disconnect();
}

module.exports = { connect, close };
