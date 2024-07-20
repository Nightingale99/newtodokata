import { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';

export default function Task({ task, tasksFns }) {
  const {
    name, done, editing, key, filtered,
  } = task;
  const [taskOnDelete, taskOnDone, taskOnEdit, taskNameChanged] = tasksFns;
  const [changedName, setChangedName] = useState(name);
  const [dateNow, setDateNow] = useState(new Date());
  let taskClass = '';
  if (filtered) {
    taskClass = 'hidden';
  } else if (done) {
    taskClass = 'completed';
  } else if (editing) {
    taskClass = 'editing';
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setDateNow(new Date());
    }, 5000);
    return () => { clearInterval(timer); };
  }, []);

  return (
        <li className={taskClass}>
            <div className="view">
              <input onClick={() => { taskOnDone(key); }} className="toggle" type="checkbox"/>
              <label>
                <span className="description">{name}</span>
                <span className="created">{formatDistance(task.created, dateNow, { includeSeconds: true })}</span>
              </label>
              <button onClick={() => { taskOnEdit(key); }} className="icon icon-edit"></button>
              <button onClick={() => { taskOnDelete(key); }} className="icon icon-destroy"></button>
            </div>
            <input type="text"
             className="edit"
             value={changedName}
             onChange={(e) => { setChangedName(e.target.value); }}
             onKeyDown={(e) => { if (e.key === 'Enter') taskNameChanged(key, e.target.value); }}></input>
          </li>
  );
}

Task.propTypes = {
  task: PropTypes.object,
  tasksFns: PropTypes.array,
};
