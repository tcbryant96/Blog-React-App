import React from 'react'
import { useEffect, useState } from 'react'
import { Button, Modal, Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"


export default function ViewPost(props) {
    const [posts, setPosts] = useState([])
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState(null)
    const [modalBody, setModalBody] = useState(null)
    const [postId, setPostId] = useState(null)
    const [modalHeader, setModalHeader] = useState(null)
    const [update, setUpdate] = useState(null)
    useEffect(() => {
        fetch(` https://kekambas-blog.herokuapp.com/blog/posts`)
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
        setUpdate(null)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [update])
    let navigate = useNavigate()
    const handleModal = async e => {
        e.preventDefault()
        let id = e.target.id
        let response = await fetch(` https://kekambas-blog.herokuapp.com/blog/posts/${id}`)
        if (response.ok) {
            let data = await response.json()
            setModalHeader('Edit Post')
            let title = data.title

            setModalTitle(title)
            let body = data.content
            setModalBody(body)
            let id = data.id
            setPostId(id)
            setModal(true)
        }
    }
    const handleDelete = async e => {
        e.preventDefault()
        setModal(true)
        setModalHeader('Delete Post')
        setPostId(e.target.id)
    }

    const handleConfirmDelete = async e => {
        let token = localStorage.token
        let myHeaders = new Headers()
        myHeaders.append("Authorization", "Bearer " + token)
        let response = await fetch(` https://kekambas-blog.herokuapp.com/blog/posts/${postId}`, {
            method: "DELETE",
            headers: myHeaders
        })
        if (response.ok) {
            setModal(false)
            setUpdate('updated')
            props.flashMessage(`Post Deleted`, 'primary')
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

        }
    }

    const handleEdit = async e => {
        e.preventDefault()


        let token = localStorage.getItem('token')
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token)
        myHeaders.append('Content-Type', 'application/json');
        let formData = JSON.stringify({
            title: e.target.title.value,
            content: e.target.content.value,
        })
        await fetch(` https://kekambas-blog.herokuapp.com/blog/posts/${postId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error)
                } else {
                    setModal(false)
                    setUpdate('updated')


                }
                props.flashMessage(`"${data.title}" updated`, 'primary')
            })


    }
    const handleViewPost = async e => {
        e.preventDefault()

        setModalHeader("Post")
        let id = e.target.id
        console.log(id)
        let response = await fetch(` https://kekambas-blog.herokuapp.com//blog/posts/${id}`)
        if (response.ok) {
            let data = await response.json()
            let username = data.author.username
            setModalHeader(`Created by: ${username}`)
            let title = data.title
            setModalTitle(title)
            let content = data.content
            setModalBody(content)
            setModal(true)

        }
    }
    function isValidHttpUrl(string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleSearch = e => {
        e.preventDefault()
        let userSearch = e.target.id
        localStorage.setItem("userSearch", userSearch)
        navigate('/userSearch')
        window.location.reload(false)
      }
    return (
        <>

            {posts.map((post, idx) => {
                return (

                    <div key={idx} className="card mt-3 col border-secondary">
                        <div className="card-header"><button className='btn w-25' onClick={handleSearch} id= {post.author.username}>{post.author.username}</button></div>
                        <div className="card-body text-center">
                            <h5 className="card-title">{post.title}</h5>
                            {isValidHttpUrl(post.content) ? <img className='img-fluid text-center mb-3'
                                src={post.content}
                                alt="car"
                            /> :
                                <p className="card-text">{post.content}</p>
                            }
                            <div className='d-flex justify-content-end'>
                                <Button className="btn btn-primary w-25 me-5" id={post.id} onClick={handleViewPost}>View Post</Button>
                                {post.author.username === localStorage.username ?
                                    <>

                                        <Button id={post.id} onClick={handleModal} className="btn-success  me-4">Edit Post</Button>


                                        <Button className="btn btn-danger" onClick={handleDelete} id={post.id}>Delete Post</Button>
                                    </>
                                    :
                                    null}
                                <Modal show={modal}>
                                    <Modal.Header >{modalHeader}</Modal.Header>
                                    {modalHeader === "Edit Post" ?
                                        <Modal.Body>
                                            <form onSubmit={handleEdit}>
                                                <input type="text" className='form-control mt-3' id="title" defaultValue={modalTitle} required />
                                                <div className="mb-3">
                                                    <textarea className="form-control mt-3" defaultValue={modalBody} id="content" rows="4" ></textarea>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <Button className="btn-btn-primary" type="submit">
                                                        Save Changes
                                                    </Button>
                                                    <Button className="btn-danger ms-3" onClick={() => setModal(false)}>
                                                        Cancel edit
                                                    </Button>
                                                </div>
                                            </form>

                                        </Modal.Body>
                                        : modalHeader === "Delete Post" ? <Modal.Body className='text-center'>Are You Sure You Want to delete post?
                                            <div className='mt-5 d-flex justify-content-evenly'>
                                                <Button className="btn btn-primary w-25 " onClick={() => setModal(false)}>
                                                    Keep Post
                                                </Button>
                                                <Button className='btn btn-danger w-25' onClick={handleConfirmDelete}>
                                                    Delete Post
                                                </Button>
                                            </div>
                                        </Modal.Body>


                                            : isValidHttpUrl(modalBody) ?
                                            <>
                                                <div className="card">
                                                    <Modal.Title className='card-title text-center'>{modalTitle}</Modal.Title>
                                                    <Modal.Body className='card-body'>
                                                    <Card.Img variant="bottom" className='fluid' src={modalBody} alt=""/>
                                                        <div className='text-end'>
                                                            <Button className='btn-danger mt-3' onClick={() => setModal(false)}>
                                                                Close
                                                            </Button>
                                                        </div>
                                                    </Modal.Body>
                                                </div>
                                            </>
                                            :                       
                                            <div className="card">
                                            <Modal.Title className='card-title text-center'>{modalTitle}</Modal.Title>
                                            <Modal.Body className='card-body'>
                                                {modalBody}
                                                <div className='text-end'>
                                                    <Button className='btn-danger mt-3' onClick={() => setModal(false)}>
                                                        Close
                                                    </Button>
                                                </div>
                                            </Modal.Body>
                                        </div>
                                    }
                                </Modal>
                                <p className='fw-lighter text-end ms-3'>{post.date_created}</p>
                                </div>
                               
                            
                        </div>
                    </div>

                )
            })}
        </>
    )
}
