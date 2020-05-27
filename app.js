const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

/*import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
*/

// routes
const authRoutes = require('./routes/api/auth');
const taskRoutes = require('./routes/api/tasks');
const userRoutes = require('./routes/api/users');
/*
import authRoutes from './routes/api/auth';
import itemRoutes from './routes/api/items';
import userRoutes from './routes/api/users';*/

const MONGO_URI = "mongodb+srv://demouser1:demouser%401@taskdb-caiym.mongodb.net/test?retryWrites=true&w=majority";
const MONGO_DB_NAME = "TASKDB";

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
//const db = `${MONGO_URI}/${MONGO_DB_NAME}`;
const db = `${MONGO_URI}`;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,    
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


//UPDATE
const db2 = require("./db");
const dbName = "test";
const collectionName = "tasks";

const {MongoClient} = require('mongodb');
    const uri = "mongodb+srv://demouser1:demouser%401@taskdb-caiym.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        client.connect();
 
 
    } catch (e) {
        console.error(e);
    } finally {
         client.close();
    }


db2.initialize(dbName, collectionName, function(dbCollection) { 
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });
    app.put("/tasks/:id", async (req, res) => {
        const itemId = req.params.id;
        const item = req.body;
        var ObjectID=require('mongodb').ObjectID;
        console.log("Editing item: ", itemId, " to be ", item);
    
        dbCollection.updateOne({ _id: ObjectID(itemId) }, { $set: item }, (error, result) => {
            if (error) throw error;
            // send back entire updated list, to make sure frontend data is up-to-date
            dbCollection.find().toArray(function(_error, _result) {
                if (_error) throw _error;
                res.json(_result);
            });
        });
    });
    
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
//export default app;
