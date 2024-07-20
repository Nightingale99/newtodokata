import './TasksFilter.css';
import PropTypes from 'prop-types';

export default function TasksFilter({ onFilterSelect, selectedFilter }) {
  return (
        <ul className="filters">
            <li>
              <button onClick={(e) => { onFilterSelect(e.target.innerText); }} className={selectedFilter === 'All' ? 'selected' : null}>All</button>
            </li>
            <li>
              <button onClick={(e) => { onFilterSelect(e.target.innerText); }} className={selectedFilter === 'Active' ? 'selected' : null}>Active</button>
            </li>
            <li>
              <button onClick={(e) => { onFilterSelect(e.target.innerText); }} className={selectedFilter === 'Completed' ? 'selected' : null}>Completed</button>
            </li>
          </ul>
  );
}

TasksFilter.propTypes = {
  onFilterSelect: PropTypes.func,
  selectedFilter: PropTypes.string,
};
