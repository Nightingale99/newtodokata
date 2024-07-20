import './NewTaskForm.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm({ inputActivated }) {
  const [inputValue, setInputValue] = useState('');

  function inputPressed(e) {
    if (e.key === 'Enter') {
      setInputValue('');
      inputActivated(e);
    }
  }

  function inputChanged(e) {
    setInputValue(e.target.value);
  }

  return (
    <header className="header">
    <h1>todos</h1>
    <input
    onKeyDown={inputPressed}
    className="new-todo"
    placeholder="What needs to be done?"
    onChange={inputChanged}
    value={inputValue}
    autoFocus/>
    </header>
  );
}

NewTaskForm.propTypes = {
  inputActivated: PropTypes.func,
};

NewTaskForm.defaultProps = {
  inputActivated: () => {},
};
