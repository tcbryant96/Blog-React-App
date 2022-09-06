import React from 'react'
import SideBar from './SideBar'
import CreatePost from './CreatePost'
import ViewPost from './ViewPost'

export default function Home(props) {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <SideBar user={props.user} />
                </div>
                <div className="col">
                    <div className="row">
                        <CreatePost flashMessage={props.flashMessage} />
                    </div>
                    <ViewPost flashMessage={props.flashMessage} />
                </div>
            </div>
        </div>
    )
}
