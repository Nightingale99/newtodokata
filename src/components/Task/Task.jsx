import { useEffect, useState } from 'react';
import { formatDistance } from "date-fns";
import './Task.css'

export default function Task({ task, tasksFns }) {
    const {name, done, editing, key, filtered} = task;
    const [taskOnDelete, taskOnDone, taskOnEdit, taskNameChanged] = tasksFns;
    const [changedName, setChangedName] = useState(name);
    const [dateNow, setDateNow] = useState(new Date());
    
    useEffect(() => {
      const timer = setInterval(() => {
        setDateNow(new Date())
      }, 5000)
      return () => {clearInterval(timer)}
    }, [])

    return (
        <li className={filtered ? 'hidden' : done ? 'completed' : editing ? 'editing' : null}>
            <div className="view">
              <input onClick={() => {taskOnDone(key)}} className="toggle" type="checkbox"/>
              <label>
                <span className="description">{name}</span>
                <span className="created">{formatDistance(task.created, dateNow, {includeSeconds: true})}</span>
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