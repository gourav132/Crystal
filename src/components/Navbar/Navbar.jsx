import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className = "nav-header">
            <nav className = "navbar">
            <div className="nav-container-1">
                <h1 className = "logo">crystal</h1>
            </div>
            <div className="nav-container-2">
                <ul className = "nav-menu">
                <li><Link className = "nav-link " to = "#">gallery</Link></li>
                <li><Link className = "nav-link " to = "#">about us</Link></li>
                <li><Link className = "nav-link " to = "#">contact us</Link></li>
                <li><Link className = "nav-link " to = "#">events</Link></li>
                </ul>
            </div>
            <div className="nav-container-3">
                <h1 className = "nav-logout hidden"><Link className = "nav-link" to = "#">logout</Link></h1>
            </div>
            </nav>
        </header>
    )
}
