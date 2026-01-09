import './Filter.css';

function Filter({ filters, onFilterChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({
            ...filters,
            [name]: value
        });
    };

    const handleClearFilters = () => {
        onFilterChange({
            status: '',
            priority: '',
            sortBy: 'createdAt',
            order: 'desc'
        });
    };

    const hasActiveFilters = filters.status || filters.priority || 
                             filters.sortBy !== 'createdAt' || filters.order !== 'desc';

    return (
        <div className="filter-container">
            <div className="filter-header">
                <h3 className="filter-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filters & Sort
                </h3>
                {hasActiveFilters && (
                    <button className="clear-filters" onClick={handleClearFilters}>
                        Clear All
                    </button>
                )}
            </div>
            
            <div className="filter-controls">
                <div className="filter-group">
                    <label htmlFor="status" className="filter-label">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="filter-select"
                        value={filters.status}
                        onChange={handleChange}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="priority" className="filter-label">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        className="filter-select"
                        value={filters.priority}
                        onChange={handleChange}
                    >
                        <option value="">All Priorities</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sortBy" className="filter-label">Sort By</label>
                    <select
                        id="sortBy"
                        name="sortBy"
                        className="filter-select"
                        value={filters.sortBy}
                        onChange={handleChange}
                    >
                        <option value="createdAt">Created Date</option>
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="order" className="filter-label">Order</label>
                    <select
                        id="order"
                        name="order"
                        className="filter-select"
                        value={filters.order}
                        onChange={handleChange}
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Filter;