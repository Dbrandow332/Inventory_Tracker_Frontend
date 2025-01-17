import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="app-header">
            <h1>Inventory Management System</h1>
            <nav>
                <ul className="nav-list">
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/inventory">Inventory</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;