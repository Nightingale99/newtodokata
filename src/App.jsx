import './App.css'
import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

export default function App() {
  const [tasks, setTasks] = useState([])

  const [selectedFilter, setSelectedFilter] = useState('All')

  function generateKey(pre) {
    return `${pre}_${Math.floor(100000 + Math.random() * 900000)}`
  }

  function filterSelected(filterName) {
    setSelectedFilter(filterName)
  }

  function inputActivated(value) {
    if (value.name.trim()) {
      setTasks((tasksState) => [
        {
          name: value.name,
          key: generateKey(value.name),
          created: new Date(),
          done: false,
          editing: false,
          seconds: value.min * 60 + value.sec,
        },
        ...tasksState,
      ])
    }
  }

  function taskOnDelete(taskKey) {
    setTasks((tasksState) => tasksState.filter((task) => task.key !== taskKey))
  }

  function taskOnDone(taskKey) {
    setTasks((tasksState) =>
      tasksState.map((task) =>
        task.key === taskKey ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function taskOnEdit(taskKey) {
    setTasks((tasksState) =>
      tasksState.map((task) =>
        task.key === taskKey ? { ...task, editing: !task.editing } : task,
      ),
    )
  }

  function taskNameChanged(taskKey, newName) {
    setTasks((tasksState) =>
      tasksState.map((task) =>
        task.key === taskKey
          ? { ...task, name: newName, editing: false }
          : task,
      ),
    )
  }

  function clearCompleted() {
    setTasks((tasksState) => tasksState.filter((task) => !task.done))
  }

  return (
    <section className="todoapp">
      <NewTaskForm inputActivated={inputActivated} />
      <TaskList
        tasks={tasks}
        tasksFns={[taskOnDelete, taskOnDone, taskOnEdit, taskNameChanged]}
        selectedFilter={selectedFilter}
      />
      <Footer
        tasksCounter={tasks.length}
        clearCompleted={clearCompleted}
        onFilterSelect={filterSelected}
        selectedFilter={selectedFilter}
      />
    </section>
  )
}
