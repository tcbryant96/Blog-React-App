import React from 'react'
import logo from '../images/profile pic.jpg'


export default function SideBarUserSearch() {
    return (
        <>
            <div className=''>
                <img src={logo} alt="" className='img-fluid' />

                <h1 className='text-center'>{localStorage.userSearch}</h1>
                <hr></hr>
            </div>
        </>
    )
}
