import { useState } from 'react';
import './Task.css'

export default function Task({ task, tasksFns }) {
    const {name, done, editing, key, filtered} = task;
    const [taskOnDelete, taskOnDone, taskOnEdit, taskNameChanged] = tasksFns;
    const [changedName, setChangedName] = useState(name);

    return (
        <li className={filtered ? 'hidden' : done ? 'completed' : editing ? 'editing' : null}>
            <div className="view">
              <input onClick={() => {taskOnDone(key)}} className="toggle" type="checkbox"/>
              <label>
                <span className="description">{name}</span>
                <span className="created">created 5 minutes ago</span>
              </label>
              <button onClick={() => {taskOnEdit(key)}} className="icon icon-edit"></button>
              <button onClick={() => {taskOnDelete(key)}} className="icon icon-destroy"></button>
            </div>
            <input type="text"
             className="edit" 
             value={changedName}
             onChange={(e) => {setChangedName(e.target.value)}}
             onKeyDown={(e) => {if (e.key === 'Enter') taskNameChanged(key, e.target.value)}}></input>
          </li>
    )
}