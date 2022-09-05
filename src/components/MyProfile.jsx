import React from 'react'
import SideBar from './SideBar';
import CreatePost from './CreatePost';
import MyPost from './MyPost';

export default function MyProfile(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <SideBar/>
                </div>
                <div className="col">
                    <div className="row">
                        <CreatePost flashMessage={props.flashMessage}/>
                    </div>
                    <MyPost/>
                </div>
            </div>
        </div>
    )
}
