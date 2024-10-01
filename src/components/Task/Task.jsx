import { useEffect, useRef, useState } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

export default function Task({ task, tasksFns, filtered = false }) {
  const { name, done, editing, key, seconds } = task
  const [taskOnDelete, taskOnDone, taskOnEdit, taskNameChanged, taskNameChangeCanceled] = tasksFns
  const [changedName, setChangedName] = useState(name)
  const [timerDate, setTimerDate] = useState(new Date(seconds * 1000))
  const timerPaused = useRef(false)
  const timerId = useRef(null)

  timerPaused.current = done

  let taskClass = ''
  if (done) {
    taskClass = 'completed'
  } else if (editing) {
    taskClass = 'editing'
  }


  useEffect(() => {
    if (timerDate.getTime() === 0) {
      clearInterval(timerId.current)
      taskOnDone(key)
    }
  }, [timerDate])

  useEffect(() => {
    if (timerDate.getTime() === 0) {
      return undefined
    }
    timerId.current = setInterval(() => {
      if (!timerPaused.current) {
        setTimerDate((tm) => new Date(tm - 1000))
      }
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  return (
    <li className={`${taskClass} ${filtered && 'hidden'}`}>
      <div className="view">
        <input
          onChange={() => {
            taskOnDone(key)
          }}
          className="toggle"
          type="checkbox"
          checked={done}
        />
        <label>
          <span className="title">{name}</span>

          <span className="description">
            <button
              type="button"
              className="icon icon-play"
              onClick={() => {
                timerPaused.current = false
              }}
            />
            <button
              type="button"
              className="icon icon-pause"
              onClick={() => {
                timerPaused.current = true
              }}
            />
            {timerDate.getMinutes().toString().padStart(2, '0')}:
            {timerDate.getSeconds().toString().padStart(2, '0')}
          </span>
          <span className="description">
            {formatDistance(task.created, new Date(), { includeSeconds: true })}
          </span>
        </label>
        <button
          type="button"
          onClick={() => {
            taskOnEdit(key)
          }}
          className="icon icon-edit"
        />
        <button
          type="button"
          onClick={() => {
            taskOnDelete(key)
          }}
          className="icon icon-destroy"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={changedName}
        onChange={(e) => {
          setChangedName(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') taskNameChanged(key, e.target.value)
          if (e.key === 'Escape') taskNameChangeCanceled(key)
        }}
      />
    </li>
  )
}

Task.propTypes = {
  filtered: PropTypes.bool,
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    key: PropTypes.string.isRequired,
    created: PropTypes.instanceOf(Date).isRequired,
    seconds: PropTypes.number,
  }).isRequired,
  tasksFns: PropTypes.arrayOf(PropTypes.func).isRequired,
}
