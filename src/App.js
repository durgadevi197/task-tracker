import {useState, useEffect} from 'react'
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';

function App() {
  const [showAddTask , setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState ([])

  useEffect(() => {
    console.log("first")
    const fetchTasks = async () => {
      console.log("second")
      const res = await fetch('http:localhost:5000/tasks')
      console.log("third")
      const data = await res.json()
     // console.log("4th")
    // console.log(data)
    }
    fetchTasks()
    .then(data => console.log(data))
    .catch(reason => console.log(reason.message))
  })
  

  
//Add Task
const addTask = (task) =>{
 // console.log(task)
 const id = Math.floor(Math.random() * 10000) + 1
 //console.log(id)
 const newTask = {id,...task}
 setTasks([...tasks, newTask])
}

//Delete Task 
const deleteTask = (id) => {
 // console.log('delete' , id )
  setTasks(tasks.filter((task)=>task.id !==id))
}

// Toggle Reminder 
const toggleReminder = (id) =>{
  //console.log('Toggle Reminder' , id)
  setTasks(tasks.map((task) => task.id === id ?
   {...task, reminder:!task.reminder} : task))
}


  return (
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd ={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks pending'}
    </div>
  );
}

export default App;
