import React, { Component } from 'react';
// import './App.css';
// import video from './video.mp4';
// import watermark from './watermark.png';

const range = Array.from({ length: 1280 }, (_, i) => i);

class Try extends Component {
    constructor() {
        super();
        this.state = {
            select: 0,
            live: false,
            positionX: 0,
            positionY: 0,
            checked: false
        };
    }

    componentDidMount() {
        debugger
        const canvas = document.getElementById("myCanvas");
        const context = canvas.getContext('2d');
        // ctx.fillRect(0, 0, 150, 75);
        // context.drawImage( 0, 0, 720, 1280);
        // context.drawImage(this.watermark, this.state.select, this.state.select);

        // if (this.state.live) {
        //   this.setState({ image: canvas.toDataURL() });
        // }
    }

    render() {
        function canvas() {
            debugger
            let canvas = document.getElementById("myCanvas");
            console.log(canvas);
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 150, 75);
        }
        return (
            <div className="try">
                <canvas id='myCanvas'>{canvas}</canvas>
               
                {/* <video controls ref={video => this.video = video} />
                <div>
                    <div className="watermarkButton" style={{}}>

                        <span className="watermarkButtonX">Watermark X
                            <select
                                className="positionX"
                                onChange={value => this.setState({ select: value, positionX: value })}
                                value={this.state.positionX}>
                                {range.map(i => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </span>

                        <span className="watermarkButtonY">Watermark Y
                            <select
                                className="positionY"
                                onChange={value => this.setState({ select: value, positionY: value })}
                                value={this.state.positionY}>

                                {range.map(i => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </span>

                        <span>Live</span>
                        <input
                            type="checkbox"
                            name="live"
                            checked={this.state.live}
                            onChange={e => this.setState({ live: e.target.value })}
                        />
                    </div>


                    <button className="watermarkButton watermarkSubmit"
                        onClick={() => {
                            const context = this.canvas2.getContext('2d');
                            context.drawImage(this.video, 0, 0, 1280, 720);
                            context.drawImage(this.watermark, this.state.positionX, this.state.positionY);
                            //   this.setState({ image: canvas.toDataURL() });
                        }}> Watermark! </button>

                    <canvas ref={canvas => this.canvas1 = canvas} width={1280} height={720} />
                    <canvas ref={canvas => this.canvas2 = canvas} width={1280} height={720} />

                    <img
                        alt="watermarks"
                        className="watermark"
                        // src={watermark}
                        style={{ visibility: 'visible' }}
                        ref={watermark => this.watermark = watermark}
                    />
                    <img
                        alt="watermarks"
                        className="imageDisplay"
                        height="405px"
                        width="560px"
                        src={this.state.image}
                    />
                </div>*/}
            </div>
                );
            } 

}

export default Try;