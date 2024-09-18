import './NewTaskForm.css'
import { useState } from 'react'
import PropTypes from 'prop-types'

export default function NewTaskForm({ inputActivated }) {
  const [inputValue, setInputValue] = useState({
    name: '',
    min: 0,
    sec: 0,
  })

  function inputPressed(e) {
    if (e.key === 'Enter') {
      inputActivated(inputValue)
      setInputValue({
        name: '',
        min: 0,
        sec: 0,
      })
    }
  }

  function timerInputHandler (e, fieldName) {
    if (e.target.value.length > 1 && e.target.value[0] === '0') {
      e.target.value = e.target.value.slice(1)
    }
    if (e.target.value < 0) {
      e.target.value = 0
    } else if (e.target.value > 59) {
      e.target.value = 59
    }
    setInputValue({ ...inputValue, [fieldName]: Number(e.target.value) })
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          onKeyDown={inputPressed}
          placeholder="What needs to be done?"
          onChange={(e) => {
            setInputValue({ ...inputValue, name: e.target.value })
          }}
          value={inputValue.name}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onKeyDown={inputPressed}
          onChange={(e) => {
            timerInputHandler(e, 'min')
          }}
          value={inputValue.min || ''}
          type="number"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onKeyDown={inputPressed}
          onChange={(e) => {
            timerInputHandler(e, 'sec')
          }}
          value={inputValue.sec || ''}
          type="number"
        />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  inputActivated: PropTypes.func.isRequired,
}
