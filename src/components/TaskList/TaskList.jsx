import './TaskList.css'
import PropTypes from 'prop-types'
import Task from '../Task/Task'

export default function TaskList({ tasks, tasksFns, selectedFilter }) {
  const taskList = tasks.map((task) => {
    if(selectedFilter === 'Active' && task.done) {
      return <Task key={task.key} filtered task={task} tasksFns={tasksFns} />
    }
    if (selectedFilter === 'Completed' && !task.done) {
      return <Task key={task.key} filtered task={task} tasksFns={tasksFns} />
    }
    return <Task key={task.key} className='' task={task} tasksFns={tasksFns} />
})

  return <ul className="todo-list">{taskList}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
      key: PropTypes.string.isRequired,
      seconds: PropTypes.number,
    }),
  ).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  tasksFns: PropTypes.arrayOf(PropTypes.func).isRequired,
}
