import React from 'react';
import Register from './Register';


export default function login(props) {


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
            <button type="button" className="btn btn-success w-100 mt-3" data-bs-toggle="modal" data-bs-target="#registerModal">
                Create An Account
            </button>


            <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="registerModal">Sign Up!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Register flashMessage={props.flashMessage} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
