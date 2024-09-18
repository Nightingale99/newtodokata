import './TaskList.css'
import PropTypes from 'prop-types'
import Task from '../Task/Task'

export default function TaskList({ tasks, tasksFns }) {
  const taskList = tasks.map((task) => (
    <Task key={task.key} task={task} tasksFns={tasksFns} />
  ))

  return <ul className="todo-list">{taskList}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
      key: PropTypes.string.isRequired,
      filtered: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  tasksFns: PropTypes.arrayOf(PropTypes.func).isRequired,
}
