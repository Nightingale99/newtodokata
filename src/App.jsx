import './App.css'
import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

function App() {
  const [tasks, setTasks] = useState([])

  function generateKey(pre) {
    return `${ pre }_${ Math.floor(100000 + Math.random() * 900000) }`;
  }

  function inputActivated (e) {
    if (e.target.value.trim()) {
      setTasks(tasks => [...tasks, 
        {
          name: e.target.value,
          key: generateKey(e.target.value),
          fromDate: new Date(),
          done: false,
          editing: false,
          filtered: false,
        }])
    }
  }

  function taskOnDelete (taskKey) {
    setTasks(tasks => tasks.filter(task => task.key !== taskKey))
  }

  function taskOnDone (taskKey) {
    setTasks(tasks => tasks.map(task => task.key === taskKey ? {...task, done: !task.done} : task))
  }

  function taskOnEdit (taskKey) {
    setTasks(tasks => tasks.map(task => task.key === taskKey ? {...task, editing: !task.editing} : task))
  }

  function taskNameChanged (taskKey, newName) {
    setTasks(tasks => tasks.map(task => task.key === taskKey ? {...task, name: newName, editing: false} : task))
  }

  function clearCompleted () {
    setTasks (tasks => tasks.filter(task => !task.done))
  }

  function filterSelected (filterName) {
    setTasks(tasks => tasks.map((task) => {return {...task, filtered: false};}))
    if (filterName === 'Active') {
      setTasks(tasks => tasks.map(task => task.done ? {...task, filtered: true} : task))
    } else if (filterName === 'Completed') {
      setTasks(tasks => tasks.map(task => !task.done ? {...task, filtered: true} : task))
    }
  }

  return (
    <section className='todoapp'>
      <NewTaskForm 
      inputActivated={inputActivated}
      />
      <TaskList 
      tasks={tasks}
      tasksFns={[taskOnDelete, taskOnDone, taskOnEdit, taskNameChanged]}
      />
      <Footer
      tasksCounter={tasks.length}
      clearCompleted={clearCompleted}
      filterSelected={filterSelected}
      />
    </section>
  )
}

export default App
