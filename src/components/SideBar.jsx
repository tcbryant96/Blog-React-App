import React from 'react'
import logo from '../images/profile pic.jpg'
import { Link } from "react-router-dom"





export default function SideBar(props) {
    return (
        <>
            <div className=''>
                <img src={logo} alt="" className='img-fluid' />
                <h1 className='text-center'>Welcome Back,</h1>
                <h1 className='text-center'>{localStorage.username}!</h1>
                <hr></hr>

                <div className='sticky-top'>
                    <Link className='btn btn-outline-primary container-fluid' to="/profile"> My Profile</Link>

                </div>
            </div>
        </>
    )
}
