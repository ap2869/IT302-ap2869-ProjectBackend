// Name: Alex Paguay
// Date: 02/19/2026
// Course: IT302-452
// Assignment: Phase 2 Read MongoDB data
// Email: ap2869@njit.edu
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import CareersDAO from "./dao/careersDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.CAREERS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await CareersDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });