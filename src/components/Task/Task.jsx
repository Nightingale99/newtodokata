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
              <button type='button' onClick={() => { taskOnEdit(key); }} className="icon icon-edit" />
              <button type='button' onClick={() => { taskOnDelete(key); }} className="icon icon-destroy" />
            </div>
            <input type="text"
             className="edit"
             value={changedName}
             onChange={(e) => { setChangedName(e.target.value); }}
             onKeyDown={(e) => { if (e.key === 'Enter') taskNameChanged(key, e.target.value); }} />
          </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    key: PropTypes.string.isRequired,
    filtered: PropTypes.bool.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  tasksFns: PropTypes.arrayOf(PropTypes.func).isRequired,
};
