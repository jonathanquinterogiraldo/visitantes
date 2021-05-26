const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/newdatabase',
    { useNewUrlParser: true },
    { useUnifiedTopology: true} 
 );

 mongoose.connection.on("error", (error) => console.log(error));
 mongoose.connection.once("open", () => console.log("Mongoose conectado"));

 const bookSchema = mongoose.Schema({
     name: String,
     author: String,
     publicationDate: String,
     available: { type: Boolean, default: false }

 });

 const BookModel = mongoose.model("Book", bookSchema);

 const fisrtBook = new BookModel({
     name: "Harry Potter El Prisionero de Azkaban",
     author: "JK Rowling",
     publicationDate: "2021-05-25",
     available: true    
 });
 
 fisrtBook.save((error) => {
     if (error) {
         console.log(error);
         return;
     }
     console.log("Document created");     
 });

 BookModel.create(
     {
         name: "Harry Potter y la piedra  Filosofal",
         author: "Jk Rowling"         
     },
     (error) => {
         if (error) {
             console.log(error);
             return;
         }
         console.log("Document Created");
     }

 );