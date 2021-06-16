import React from 'react'
import Body from '../chat/body'
import Video from '../video/video'
export default function Stream(props) {
    return (
        <div className="App" style={{ backgroundColor: "gray", height: "700px" }}>
            <header className="App-header">
                <Body />
            </header>
            <Video {...props} />
        </div>
    )
}
