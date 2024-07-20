import { useState } from 'react'
import './TasksFilter.css'

export default function TasksFilter({filterSelected}) {
    const [selectedFilter, setSelectedFilter] = useState('All');

    function filterClicked(e) {
        setSelectedFilter(e.target.innerText);
        filterSelected(e.target.innerText);
    }

    return (
        <ul className="filters">
            <li>
              <button onClick={filterClicked} className={selectedFilter === 'All' ? 'selected' : null}>All</button>
            </li>
            <li>
              <button onClick={filterClicked} className={selectedFilter === 'Active' ? 'selected' : null}>Active</button>
            </li>
            <li>
              <button onClick={filterClicked} className={selectedFilter === 'Completed' ? 'selected' : null}>Completed</button>
            </li>
          </ul>
    )
}