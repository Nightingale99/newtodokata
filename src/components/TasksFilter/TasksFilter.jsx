import './TasksFilter.css'
import React from 'react'
import PropTypes from 'prop-types'

export default function TasksFilter({ onFilterSelect, selectedFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          onClick={(e) => {
            onFilterSelect(e.target.innerText)
          }}
          className={selectedFilter === 'All' ? 'selected' : null}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={(e) => {
            onFilterSelect(e.target.innerText)
          }}
          className={selectedFilter === 'Active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={(e) => {
            onFilterSelect(e.target.innerText)
          }}
          className={selectedFilter === 'Completed' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  onFilterSelect: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
}
