const express = require("express");
const app = express();


app.get('/', (req, res) =>{
    res.send('app is working ');
})

app.listen(3000, (req, res) =>{
    console.log(`app is listening on 3000`);
})