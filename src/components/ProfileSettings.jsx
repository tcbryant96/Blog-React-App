
import React from 'react'
import SideBar from './SideBar'
import { Button, Modal } from 'react-bootstrap'

export default function ProfileSettings(props) {
  return (
    <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <SideBar user={props.user} />
                </div>
                <div className="col text-center mt-5">
                   <Button className='btn-warning w-75 mt-3'>
                    Change Username
                   </Button>
                   <Button className='btn-warning w-75 mt-5'>
                    Change Email
                   </Button>
                   <Button className='btn-warning w-75 mt-5'>
                    Change Password
                   </Button>
                </div>
            </div>
        </div>
  )
}
