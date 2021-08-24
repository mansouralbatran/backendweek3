'use stric'
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
server.use(cors());
server.use(express.json())

mongoose.connect('mongodb://localhost:27017/book', { useNewUrlParser: true, useUnifiedTopology: true });
/////class

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

server.delete('/deleteCat/:BookId',DeleteBook)

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








function testHandler(req, res) {
    res.send('all good')
}
