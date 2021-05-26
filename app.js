const express = require('express');
const app = express(); 
const port = 3000;  
const time = require('express-timestamp');

 const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/newdatabase', { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
});

 mongoose.connection.on("error", (error) => console.log(error));
 mongoose.connection.once("open", () => console.log("Mongoose conectado"));

 const visistSchema = mongoose.Schema({    
     date: Date,
     name: String,        
 });

const visitModel = mongoose.model("Visit", visistSchema);

app.use(time.init);

app.get('/', (req, res) => {

     const visit = new visitModel({
        date: req.timestamp,
        name: req.query.name,                   
    });
    
    visit.save((error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log("Visit created");     
    });

    res.send(`<h1>Hola ${req.query.name}!</h1>`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));


