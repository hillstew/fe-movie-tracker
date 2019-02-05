import React from 'react'
import PropTypes from "prop-types"
import { NavLink, Link } from 'react-router-dom'

export const Header = ({ logoutUser, user }) => {
  return (
    <header className="header">
      <h1>Movie Tracker</h1>
      <nav>
        <NavLink to="/" className="nav">
          Show All Movies
        </NavLink>
        {!user.id && (
          <NavLink to="/login" className="nav">
            Login
          </NavLink>
        )}
        {!user.id && (
          <NavLink to="/signup" className="nav">
            Signup
          </NavLink>
        )}
        {!user.id && (
          <NavLink to="/login" className="nav">
            View Favorites
          </NavLink>
        )}
        {user.id && (
          <NavLink to="/favorites" className="nav">
            View Favorites
          </NavLink>
        )}
        {user.id && (
          <Link to="/">
            <button onClick={logoutUser} />
          </Link>
        )}
      </nav>
    </header>
  )
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object
}