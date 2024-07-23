import './App.css';
import { useState } from 'react';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState('All');

  function generateKey(pre) {
    return `${pre}_${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function filterSelected(filterName) {
    setSelectedFilter(filterName);
    setTasks((tasksState) => tasksState.map((task) => ({ ...task, filtered: false })));
    if (filterName === 'Active') {
      setTasks((tasksState) => tasksState.map((task) => (
        task.done ? { ...task, filtered: true } : task)));
    } else if (filterName === 'Completed') {
      setTasks(
        (tasksState) => tasksState.map((task) => (
          !task.done ? { ...task, filtered: true } : task)),
      );
    }
  }

  function inputActivated(e) {
    if (e.target.value.trim()) {
      setTasks((tasksState) => [
        {
          name: e.target.value,
          key: generateKey(e.target.value),
          created: new Date(),
          done: false,
          editing: false,
          filtered: false,
        }, ...tasksState]);
      filterSelected(selectedFilter);
    }
  }

  function taskOnDelete(taskKey) {
    setTasks((tasksState) => tasksState.filter((task) => task.key !== taskKey));
  }

  function taskOnDone(taskKey) {
    setTasks((tasksState) => tasksState.map((task) => (
      task.key === taskKey ? { ...task, done: !task.done } : task)));
    setTimeout(() => { filterSelected(selectedFilter); }, 500);
  }

  function taskOnEdit(taskKey) {
    setTasks((tasksState) => tasksState.map((task) => (
      task.key === taskKey ? { ...task, editing: !task.editing } : task)));
  }

  function taskNameChanged(taskKey, newName) {
    setTasks((tasksState) => tasksState.map((task) => (
      task.key === taskKey ? { ...task, name: newName, editing: false } : task)));
  }

  function clearCompleted() {
    setTasks((tasksState) => tasksState.filter((task) => !task.done));
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
      onFilterSelect={filterSelected}
      selectedFilter={selectedFilter}
      />
    </section>
  );
}
