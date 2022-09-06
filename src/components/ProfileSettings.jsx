
import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Button, Modal, Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

export default function ProfileSettings(props) {
    const [user, setUser] = useState([])
    const [modalTopic, setModalTopic] = useState(null)
    const [modal, setModal] = useState(false)

    let navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.token
        let myHeaders = new Headers()
        myHeaders.append('Authorization', 'Bearer ' + token)
        let getData = async data => {
            let response = await fetch(` https://kekambas-blog.herokuapp.com/auth/me`, {
                headers: myHeaders
            })
            if (response.ok) {
                let data = await response.json()
                setUser(data)

            }

        }
        getData()



    }, [user])
    const handleTopic = async e => {
        let topic = e.target.id
        setModalTopic(topic)
        setModal(true)
    }

    const handleChangeUserName = async e => {
        e.preventDefault()
        let username = e.target.username.value
        let token = localStorage.token
        let myHeaders = new Headers()
        let id = user.id
        let formData = JSON.stringify({
            username: username
        })

        myHeaders.append("Authorization", "Bearer " + token)
        myHeaders.append("Content-Type", "application/json")
        let response = await fetch(` https://kekambas-blog.herokuapp.com/auth/users/${id}`, {
            method: "PUT",
            headers: myHeaders,
            body: formData

        })
        if (response.ok) {
            let data = await response.json()
            setUser(data)
            localStorage.setItem("username", data.username)
            setModal(false)
            props.flashMessage(`Username updated to "${data.username}"`, "success")

        }

    }
    const handleChangeEmail = async e => {
        e.preventDefault()
        let email = e.target.email.value
        let token = localStorage.token
        let myHeaders = new Headers()
        let id = user.id
        let formData = JSON.stringify({
            email: email
        })

        myHeaders.append("Authorization", "Bearer " + token)
        myHeaders.append("Content-Type", "application/json")
        let response = await fetch(` https://kekambas-blog.herokuapp.com/auth/users/${id}`, {
            method: "PUT",
            headers: myHeaders,
            body: formData

        })
        if (response.ok) {
            let data = await response.json()
            setModal(false)
            props.flashMessage(`Email updated to "${data.email}"`, "success")

        }

    }
    const handlePassword = async e => {
        console.log('Hi')
        e.preventDefault()
        let password = e.target.password.value
        let token = localStorage.token
        let myHeaders = new Headers()
        let id = user.id
        let formData = JSON.stringify({
            password: password
        })

        myHeaders.append("Authorization", "Bearer " + token)
        myHeaders.append("Content-Type", "application/json")
        let response = await fetch(` https://kekambas-blog.herokuapp.com/auth/users/${id}`, {
            method: "PUT",
            headers: myHeaders,
            body: formData

        })
        if (response.ok) {
            setModal(false)
            props.flashMessage(`Password has been changed.`, "success")

        }
    }
    const handleDelete = async e => {
        e.preventDefault()
        let token = localStorage.token
        let id = user.id
        let myHeaders = new Headers()
        myHeaders.append("Authorization", "Bearer " + token)
        let response = await fetch(`https://kekambas-blog.herokuapp.com/auth/users/${id}`, {
            method: "DELETE",
            headers: myHeaders
        })
        console.log(response)
        if (response.ok) {
            console.log("succes")
            navigate('/')
        }

    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <SideBar user={user.username} />
                    </div>
                    <div className="col text-center mt-5">
                        <Card className='border-dark'>
                            <Card.Header as="h5">Settings</Card.Header>
                            <Card.Body>

                                <Button onClick={handleTopic} id="username" className='btn-warning w-75 mt-3'>
                                    Change Username
                                </Button>
                                <Button onClick={handleTopic} id="email" className='btn-warning w-75 mt-5'>
                                    Change Email
                                </Button>
                                <Button id="password" onClick={handleTopic} className='btn-warning w-75 mt-5'>
                                    Change Password
                                </Button>
                                <Button id="delete" onClick={handleTopic} className='btn-danger w-75 mt-5'>
                                    Delete Acoount
                                </Button>

                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <Modal show={modal}>
                {modalTopic === 'delete' ?
                    <Modal.Header>
                        Delete Account
                    </Modal.Header>
                    : <Modal.Header className='card-header'>
                        Change {modalTopic}
                    </Modal.Header>}
                {modalTopic === "username" ?
                    <Modal.Title className='ms-3'>
                        {modalTopic}: "{user.username}"
                    </Modal.Title>
                    : modalTopic === "email" ?
                        <Modal.Title className='ms-3'>
                            {modalTopic}: "{user.email}"
                        </Modal.Title>
                        : modalTopic === "delete" ?
                            <Modal.Title className='ms-3 text-bold'>
                                Are You Sure?
                            </Modal.Title> : null}
                <Modal.Body>
                    {modalTopic === "username" ?
                        <form onSubmit={handleChangeUserName}>

                            <div className="mb-3">
                                <label className="form-label" >New {modalTopic}</label>
                                <input type="name" className="form-control" id={modalTopic} placeholder={modalTopic} />
                            </div>
                            <div className='d-flex justify-content-end'>
                                <Button type="submit">
                                    Save Changes
                                </Button>
                                <Button onClick={() => setModal(false)} className='btn-danger ms-3'>
                                    Close
                                </Button>
                            </div>
                        </form>
                        : modalTopic === "email" ?
                            <form onSubmit={handleChangeEmail}>

                                <div className="mb-3">
                                    <label className="form-label" >New {modalTopic}</label>
                                    <input type="email" className="form-control" id={modalTopic} placeholder={modalTopic} />
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <Button type="submit">
                                        Save Changes
                                    </Button>
                                    <Button onClick={() => setModal(false)} className='btn-danger ms-3'>
                                        Close
                                    </Button>
                                </div>
                            </form>
                            : modalTopic === "delete" ?
                                <form onSubmit={handleDelete}>
                                    <div className='d-flex justify-content-end'>
                                        <Button type="submit btn-primary">
                                            I'm Sure
                                        </Button>
                                        <Button onClick={() => setModal(false)} className='btn-danger ms-3 w-25'>
                                            Close
                                        </Button>
                                    </div>
                                </form>


                                : <form onSubmit={handlePassword}>

                                    <div className="mb-3">
                                        <label className="form-label" >New {modalTopic}</label>
                                        <input type="password" className="form-control" id={modalTopic} placeholder={modalTopic} />
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <Button type="submit">
                                            Save Changes
                                        </Button>
                                        <Button onClick={() => setModal(false)} className='btn-danger ms-3'>
                                            Close
                                        </Button>
                                    </div>
                                </form>}
                </Modal.Body>
            </Modal>
        </>



    )
}
