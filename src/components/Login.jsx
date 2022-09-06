import React, { useState } from 'react';
import Register from './Register';
import { Button, Modal } from "react-bootstrap";



export default function Login(props) {

    const [modal, setModal] = useState(false)

    const modalSetFalse = () => {
        setModal(false)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let username = e.target.username.value;
        let password = e.target.password.value;


        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`))


        let response = await fetch('https://kekambas-blog.herokuapp.com/auth/token', { method: "POST", headers: myHeaders });
        if (response.ok) {
            let data = await response.json();


            localStorage.setItem('token', data.token);
            // localStorage.setItem('username', data.author.username)

            props.login();


            props.flashMessage('You have successfully logged in', 'success');
        } else {
            props.flashMessage('Your username and/or password are incorrect', 'danger');
        }


    }

    return (
        <>


            <h4 className="text-center">Login</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type='text' className='form-control' placeholder='Enter Username' name='username' />

                    <label htmlFor="password">Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' name='password' />

                    <input type='submit' className='btn btn-primary w-100 mt-3' value='Login' />

                </div>
            </form>
            <Button className='btn-success container-fluid mt-3' onClick={() => setModal(true)}>
                Create An Account
            </Button>

            <Modal show={modal}>
                <Modal.Title>Sign Up!</Modal.Title>
                <Modal.Body>
                    <Register flashMessage={props.flashMessage} modalSetFalse={modalSetFalse} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-danger' onClick={() => setModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
