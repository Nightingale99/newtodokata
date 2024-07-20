import './TaskList.css'
import Task from '../Task/Task'
import PropTypes from 'prop-types'
export default function TaskList({ tasks, tasksFns }) {
    const taskList = tasks.map((task) => {
    return(<Task 
        key={task.key}
        task={task}
        tasksFns={tasksFns}
        />)
    })
    
    
    return (
        <ul className="todo-list">
          {taskList}
        </ul>
    )
}

TaskList.propTypes = {
    tasks: PropTypes.object,
    tasksFns: PropTypes.array,
}

TaskList.defaultProps = {
    tasks: {},
    tasksFns: [],
}