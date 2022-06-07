const express = require('express');
const mongoose =require('mongoose');
const dotenv = require('dotenv')
const todoHandler = require('./routeHandler/todoHandler')
const userHandler = require('./routeHandler/userHandler')



const app = express();
dotenv.config();
app.use(express.json());


// database connection with mongoose
mongoose.connect('mongodb://localhost/todos')
    .then(()=> console.log('Connection Successful'))
    .catch(err=>console.log(err));


// application routes 
app.use('/todo',todoHandler);
app.use('/user',userHandler);

// error handler 
const errorhandler = function errorHandler(err, req, res, next){
    if(res.headersSend){
        return next(err);
    }
    res.status(500).json({error:err});
}

app.use(errorhandler);

app.listen(8080, ()=>{
    console.log("app listening at port 8080");
})