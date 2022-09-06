import React from 'react'




export default function Register(props) {


    const handleSubmit = (e) => {
        e.preventDefault();
        let password = e.target.password.value;
        let confirmPass = e.target.confirmPass.value;
        if (password !== confirmPass) {
            props.flashMessage("Your passwords do not match", "danger");
        } else {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let formData = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password,
            });

            fetch("https://kekambas-blog.herokuapp.com/auth/users", {
                method: "POST",
                headers: myHeaders,
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        console.error(data.error);
                    } else {
                        props.flashMessage("Account created", "success");
                        props.modalSetFalse()
                    }
                });
        }
    }

    return (
        <>

            <h4 className="text-center">Create Your Account</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        name="email"
                        required
                    />
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        name="username"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        required
                    />
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password Again"
                        name="confirmPass"
                        required
                    />

                    <input
                        type="submit"
                        className="btn btn-primary w-100 mt-3"
                        value="Sign Up"
                    />
                </div>
            </form>
        </>
    )
}
