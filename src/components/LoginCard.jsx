import React from 'react'
import Login from './Login'
export default function LoginCard(props) {
    return (
        <>
       
        
        <div className="card col-6 mt-5 container-fluid">
            <div className="card-body">
                <Login flashMessage={props.flashMessage} login={props.login}/>
            </div>
        </div>
        
        </>
    )
}
