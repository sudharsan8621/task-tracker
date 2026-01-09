import './Header.css';

function Header({ taskCount }) {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-brand">
                    <div className="header-logo">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <h1 className="header-title">Task Tracker</h1>
                </div>
                <div className="header-stats">
                    <span className="task-count">
                        {taskCount} {taskCount === 1 ? 'Task' : 'Tasks'}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;