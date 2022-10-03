import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask= async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json()
    return data
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !data.reminder} : task))
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([ ...tasks, data ])
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task }
    
    // setTasks([...tasks, newTask])
  }

  return (
    <Router>
      <div className="container">
      <Header title="Task Tracker" 
              onAdd={() => setShowAddTask(!showAddTask)}
              showAdd={showAddTask} 
      />
      
      <Routes>
        <Route path='/' exact element={<>
          {showAddTask && <AddTask 
                        onAddTask={addTask} 
                      />}
      {tasks.length > 0 ? 
      <Tasks tasks={tasks} 
             onDelete={deleteTask} 
             onToggle={toggleReminder} 
      />
      : <p style={{color: "white"}}>No Task To Show</p>}</>} />
        <Route path='/about' element={<About/>}  />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
