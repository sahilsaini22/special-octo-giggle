const express = require('express');
const app = require('./app');
const path = require('path');
//import app from './app';
//import config from './config';

app.use(express.static(path.join(__dirname,'client', 'build')));
app.get('/', (req,res) => { 
    console.log('Hello World ');
    resp.sendFile(path.join(__dirname,'client','build','index.html'));
});

const PORT = 4000;

app.listen(PORT, () => console.log(`Server startevisuald on PORT ${PORT}`));