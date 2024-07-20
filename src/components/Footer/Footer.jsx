import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

export default function Footer({tasksCounter, clearCompleted, filterSelected}) {
    return (
        <footer className="footer">
          <span className="todo-count">{tasksCounter} items left</span>
            <TasksFilter filterSelected={filterSelected}/>
          <button onClick={clearCompleted} className="clear-completed">Clear completed</button>
        </footer>
    )
}