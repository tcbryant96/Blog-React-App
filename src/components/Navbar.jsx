import React from 'react'
import { Link, useNavigate } from "react-router-dom"

export default function Navbar(props) {
  let navigate = useNavigate()
  const handleLogout = e => {
    e.preventDefault()
    props.logout()
  }
  const handleSearch = e => {
    e.preventDefault()
    let userSearch = e.target.search.value
    localStorage.setItem("userSearch", userSearch)
    navigate('/userSearch')
    window.location.reload(false)
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top  navbar-dark bg-primary">
        <div className="container-fluid">
          <h3 className='text-white me-3'>Blog</h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <Link className='dropdown-item' to="/profile"> My Profile</Link>
                  <Link className='dropdown-item' to="/profile/settings">Settings</Link>

                  <Link className='dropdown-item' to="/" onClick={handleLogout}> Logout</Link>

                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input className="form-control me-2" id="search" type="search" placeholder="Search by user..." aria-label="Search"></input>
              <button className="btn btn-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
