import React, { useEffect, useState } from 'react'

export default function CreatePost(props) {
    const [update, setUpdate] = useState(null)
    useEffect(() => {
        setUpdate(null)
    }, [update])
    const handleSubmit = e => {
        e.preventDefault()

        let token = localStorage.getItem('token')
        let myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + token)
        myHeaders.append('Content-Type', 'application/json')
        let formData = JSON.stringify({
            title: e.target.title.value,
            content: e.target.content.value,
        })
        fetch('https://kekambas-blog.herokuapp.com/blog/posts', {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error)
                } else {
                    props.flashMessage('Post created', 'success')
                    setUpdate('updated')

                }
            })
        e.target.title.value = ""
        e.target.content.value = ""
    }

    return (
        <>

            <div className="card border-dark mt-3 ">
                <div className="card-body">
                    <h2 className='card-header text-center bg-primary text-white'>Create Post</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" className='form-control mt-3' placeholder='Title...' id="title" required />
                        <div className="mb-3">
                            <textarea className="form-control mt-3" placeholder='Enter Text..' id="content" rows="4" ></textarea>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <input type="submit" className='btn btn-success w-25' />

                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
