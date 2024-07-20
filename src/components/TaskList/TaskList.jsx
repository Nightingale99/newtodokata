import './TaskList.css'
import Task from '../Task/Task'

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