
import React, { useEffect, useState } from 'react'

export default function MyPost(props) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(` https://kekambas-blog.herokuapp.com/blog/posts`)
            .then(res => res.json())
            .then(data => {
                let newData = data.filter(data => data.author.username === localStorage.username)
                setPosts(newData)
            })
    }, [posts])
    return (
        <>
            {posts.map((post, idx) => {
                return (

                    <div key={idx} className="card mt-3 col border-secondary">
                        <div className="card-header">{post.author.username}</div>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content}</p>
                            <div className='d-flex justify-content-between'>
                                <a href="/" className="btn btn-primary">View Post</a>
                                <p className='fw-lighter'>{post.date_created}</p>
                            </div>
                        </div>
                    </div>

                )
            })}
        </>
    )
}
