'use stric'
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
server.use(cors());
server.use(express.json())

mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
//class/////mongodb://mansour:0000@mansourclustr-shard-00-00.9lgt0.mongodb.net:27017,mansourclustr-shard-00-01.9lgt0.mongodb.net:27017,mansourclustr-shard-00-02.9lgt0.mongodb.net:27017/bookdata?ssl=true&replicaSet=atlas-qu88y1-shard-0&authSource=admin&retryWrites=true&w=majority

// mongodb://localhost:27017/book
//Schema
const bookSchema = new mongoose.Schema({
    title: String,
    description:String,
    email:String
});

//Model
const bookModel = mongoose.model('book', bookSchema);





/////servers
server.get('/test', testHandler);

server.post('/addbook',AddBook)

server.delete('/deletebook/:BookId',DeleteBook)



server.put('/updatebook',updateBook)


server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`)
})

server.get('/getbook',getbookfunction)
////function

function seedDataCollection() {
    const math = new bookModel({
        title:'math',
    description:'The thing is, the description isn’t a summary or a book report. It’s an ad',
    email:'mansouralbatran@gmail.com'
    })

    const english = new bookModel({
        title:'english',
        description:'What is the first thing you check on a book (after the cover art)? I would bet, whether you’re at the library, at a bookstore, or shopping online, it’s the book description',
        email:'mansouralbatran@gmail.com'
    })

    const arabic = new bookModel({
        title: 'arabic',
        description:'But what determines good book descriptions? Do book descriptions fall into categories like voice and style, where it’s not so easily taught as developed through practice?',
        email:'mansouralbatran@gmail.com',
    })
    math.save();
    english.save();
    arabic.save();
}

// seedDataCollection();


 function getbookfunction(req,resp){
    let email1 = req.query.useremail;
    // console.log(email1);
    bookModel.find({email:email1},function(err,ownerData){
        if(err) {
            console.log('error in getting the data')
        } else {
            // console.log(ownerData);
            resp.send(ownerData)
            // console.log(ownerData);
        }
    })

 }
 async function AddBook(req,res){
     let bookTitle=req.body
    //  console.log(bookTitle);
     const addedBook = new bookModel({
        title:bookTitle.Title1,
        description:bookTitle.Description1,
        email:bookTitle.emailuser
    })

    await addedBook.save();
    // console.log(addedBook);
    
    bookModel.find({email:bookTitle.emailuser}, function (err, ownerData) {
        if (err) {
            console.log('error in getting the data')
        } else {
            // console.log(ownerData);
            res.send(ownerData)
        }
    })

 }
//  BookId
function DeleteBook(req,res){
let Email=req.query.email
let DeletedBook=req.params.BookId
console.log(Email);
bookModel.remove({_id:DeletedBook},function(error,DeletedData){
    if(error){
        console.log('Error in deleting the Item');
    }
    else{
        console.log('Data deleted',DeletedData);
        bookModel.find({email:Email}, function (err, RemainedData) {
            if (err) {
                console.log('error in getting the data')
            } else {
                // console.log(DeletedData);
                res.send(RemainedData)

            }
        })
    }
})
}
function updateBook (req,res){
  let  selectedbook=req.body
//   console.log('aaaaaaa',selectedbook);
  bookModel.find({_id:selectedbook.id},async function(err,udatingdata){
  if (err) {
    console.log('error in getting the data')
} else {
    // console.log(DeletedData);
    // console.log(udatingdata)

    udatingdata[0].title=selectedbook.Title1
    udatingdata[0].description=selectedbook.Description1
    udatingdata[0].email=selectedbook.emailuser

    // console.log('bbbbbbbbbbbb',udatingdata)

    await udatingdata[0].save();

    bookModel.find({email:selectedbook.emailuser}, function (err, RemainedData) {
        if (err) {
            console.log('error in getting the data')
        } else {
            // console.log(DeletedData);
            console.log(RemainedData);
            res.send(RemainedData)

        }
    })
    

}

 })

}







function testHandler(req, res) {
    res.send('all good')
}
