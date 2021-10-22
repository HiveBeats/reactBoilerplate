import * as React from 'react'
import { NavLink } from 'react-router-dom';


export default function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Сервисы</NavLink>
                <NavLink to="/todos" className="nav-item nav-link">Дела</NavLink>
                <NavLink to="/calendar" className="nav-item nav-link">Календарь</NavLink>
                <NavLink to="/weather" className="nav-item nav-link">Погода</NavLink>
            </div>
        </nav>
    );

}