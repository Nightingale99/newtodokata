import './TaskList.css';
import PropTypes from 'prop-types';
import Task from '../Task/Task.jsx';

export default function TaskList({ tasks, tasksFns }) {
  const taskList = tasks.map((task) => (<Task
        key={task.key}
        task={task}
        tasksFns={tasksFns}
        />));

  return (
        <ul className="todo-list">
          {taskList}
        </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.object,
  tasksFns: PropTypes.array,
};

TaskList.defaultProps = {
  tasks: {},
  tasksFns: [],
};
