import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [accomplish, setAccomplish] = useState("");

  useEffect(() => {
    fetchtasks();
  },[]);

  const fetchtasks = () => {
    axios
      .get("http://localhost:3001/tasks")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error, "unable to fetch tasks");
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/tasks`, { accomplish }).then(() => {
      setAccomplish("");
      fetchtasks();
    });
  };

  const handleDelete = (id) =>{
    axios.delete(`http://localhost:3001/tasks/${id}`)
    .then(()=>{
        fetchtasks()
    })
    .catch((error)=>{
        console.log(error,'unable to delete task')
    })
  }
  return (
    <div className="text-center p-6">
      <h1 className="text-2xl">TODO APP</h1>

      <div>
        <form className="inline-grid" onSubmit={handleSubmit}>
          <label>Task:</label>
          <input
            className="w-[300px] h-[50px] border border-black p-2"
            value={accomplish}
            placeholder="Add Todo Here..."
            onChange={(e) => setAccomplish(e.target.value)}
          />
          <button
            type="submit"
            className="w-[300px] h-[50px] border border-black mt-6 hover:bg-teal-600 hover:text-white"
          >
            Submit Todo
          </button>
        </form>
        <hr className="border border-black mt-10 w-[100%]" />
        <h2 className="mt-10">Todolist:</h2>
        <br/>
        <br/>
        <br/>
        {
            tasks.map((task)=>(
                <div key={task._id} className="border border-black max-w-md mx-auto p-3">
                <li className="list-none" >{task.accomplish}</li>
                <button className="translate-x-[40px]" onClick={()=>handleDelete(task._id)}>X</button>
                </div>
            ))
        }
      </div>
    </div>
  );
}

export default Home;
