const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Todo = require('./models/todoSchema')

// connect to express
const app = express();

//connect to mongoDB
const dbURI =
  "mongodb+srv://superstar:mernpassword@cluster0.91liaxw.mongodb.net/Mern_ToDo?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => {
      console.log(
        "server is successfully connected to port 3001 and mongoDB is connected"
      )
    })
  })
  .catch((error)=>{
    console.log(error,'Server and MongoDB is failed t connect')
  })

//middleware
app.use(cors());
app.use(bodyParser.json());


//Routes
// GET Task
app.get('/tasks',(req,res)=>{
    const tasks = Todo.find()
    .then((tasks)=>{
        res.json(tasks)
    })
    .catch((error)=>{
        res.json({message:'unable to get tasks:', error})
    })
})

// POST task
app.post('/tasks',(req,res)=>{
    const {accomplish} = req.body
    const task = new Todo({accomplish})
    task.save()
    .then((task)=>{
        res.json({message:'Task successfully CREATED'})
    })
    .catch((error)=>{
        res.json({message:'unable to create a task:',error})
    })
})

//Updata/PUT task
app.put('/tasks/:id',(req,res)=>{
    const {id} = req.params
    const {accomplish }=req.body
    const updateTask = Todo.findByIdAndUpdate(id,
        {accomplish},
        {value:true}
    )
    .then((updateTask)=>{
        res.json({message:'task UPDATED successfully'})
    }) 
    .catch((error)=>{
        res.json({message:'unable to update the task:',error})
    })
})


//delete task
app.delete('/tasks/:id',(req,res)=>{
    const {id} = req.params
    const {accomplish} = req.body
    const deleteTask = Todo.findByIdAndDelete(
        id,
        {accomplish},
        {value:true}
    )
    .then((deleteTask)=>{
        res.json({message:'Task Deleted Successfuly'})
    })
    .catch((error)=>{
        res.json({message:'unable to delete the task:',error})
    })
})


// Create- POST 
// Read - GET
// Update-PUT
// Delete-DELETE



