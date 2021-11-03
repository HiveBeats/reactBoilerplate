import * as React from 'react'
import { NavLink } from 'react-router-dom';


export default function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Погода</NavLink>
            </div>
        </nav>
    );

}