const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todos",todoSchema);

const checkLogin = require('../middlewares/checkLogin');

 //get all the todo
router.get('/',checkLogin, (req,res)=>{
    console.log(req.username);
    console.log(req.userId);
  Todo.find({status:"active"}).select({_id:0,date:0,__v:0}).limit(2).exec((err,result)=>{
    if(err){
        res.status(500).json({
            error:"There was a server side error!"
        })
    }else{
        res.status(200).json({
            data:result
        });
    }
 })
});
 //get a  todo by id
router.get('/:id',async (req,res)=>{
    Todo.find({ _id: req.params.id},(err,data)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            })
        }else{
            res.status(200).json({
                result:data
            });
        }
    })
});

 //post a todo
 router.post('/', async (req,res)=>{
    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            })
        }else{
            res.status(200).json({
                message:"Todo was inserted successfully!"
            });
        }
    })

});

 //post multiple todo
 router.post('/all',async (req,res)=>{
    await Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            })
        }else{
            res.status(200).json({
                message:"Todos where inserted successfully!"
            });
        }
    })
});
//put todo
router.put('/:id',  (req,res)=>{
      Todo.findByIdAndUpdate({ _id: req.params.id},
        {
        $set:{status:"Inactive"},
    }, (err)=>{
       if(err){
        res.status(500).json({
            error:"There was a server side error!"
        })
       }else{
        res.status(200).json({
            error:"Todo was updated Successfully!"
        });
       }
    });

});

//delete todo
router.delete('/:id', (req,res)=>{
    Todo.deleteOne({ _id: req.params.id},(err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            })
        }else{
            res.status(200).json({
                error:"Data delete successfully!"
            });
        }
    })
});

// export 
module.exports = router;