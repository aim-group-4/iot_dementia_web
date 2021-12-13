import React, {Component, useEffect} from "react";
import logo from "../logo.svg";
import io from "socket.io-client";
//for deployment
//const SERVER = "/"

//for local testing
const SERVER = "http://localhost:9000"
let count = 0
function Index() {
    let socket
    let sock
    useEffect(async () => {
        //for deployment
        //const response = await fetch('/testAPI')

        //for local testing
        const response = await fetch('http://localhost:9000/testAPI')
        let res_reader = response.text()
        console.log(await res_reader)
        socket = io(SERVER, {
            autoConnect: false,
            reconnection: false,
            transports:["websocket"],
            auth:{token:'client'},
            upgrade: false
        });
        sock = socket.connect()
        sock.on('message', (data) => {
            console.log("message")
        })

        sock.on('device_alert', (data) => {
            console.log('alertted!')
            console.log("device was: " + data)
            color_setter_arr[parseInt(data)-1]("red")
            msg_setter_arr[parseInt(data)-1]("visible")
        })
    })
    function sockEmit(num){
        console.log("sockEmit function called")
        console.log(sock)
        if(sock){
            console.log("emitting...")
            sock.emit('device_alert', num)
        }
    }

    const [state1, setState1]= React.useState("Nothing yet")
    const [device1_color, setD1Color] = React.useState("#2c3744")
    const [device2_color, setD2Color] = React.useState("#2c3744")
    const [device3_color, setD3Color] = React.useState("#2c3744")

    let color_setter_arr = [setD1Color, setD2Color, setD3Color]

    const [device1_msg, setD1Msg] = React.useState("hidden")
    const [device2_msg, setD2Msg] = React.useState("hidden")
    const [device3_msg, setD3Msg] = React.useState("hidden")

    let msg_setter_arr = [setD1Msg, setD2Msg, setD3Msg]

    function callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => setState1(res))
            .catch(err => err)
    }
    return (
        <div className="App">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
            </style>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet" />
            <div className='body'>
                <header className="">
                    <nav className="nav">
                        <div className="nav-wrap" id="nav-wrap">
                            <div className="main_link">
                                <a href="/">AIM Group 4</a>
                            </div>
                            <div className="nav_options">
                                <div className="nav_options_item">
                                    <a className="nav_selected" href="/">Dashboard</a>
                                </div>
                                <div className="nav_options_item">
                                    <a href="#">Menu 1</a>
                                </div>
                                <div className="nav_options_item">
                                    <a href="#">Menu 2</a>
                                </div>
                                <div className="nav_options_item">
                                    <a href="#">Menu 3</a>
                                </div>
                            </div>
                            <div className="nav_profile">
                                <a href="#">Profile</a>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="body_main">
                    <div className="body_main_icons_title">Your Devices</div>
                    <div className="body_main_icons">
                        <div className="body_main_item">
                            <div className="device_name">Bedroom</div>
                            <div className="circle" style={{ background: device1_color }}>
                            <span className="material-icons main_widget">
                                bed
                            </span>
                            </div>
                            <div className='widget_alert' style={{visibility: device1_msg}}>alertted!</div>
                        </div>
                        <div className="body_main_item">
                            <div className="device_name">Kitchen</div>
                            <div className="circle" style={{ background: device2_color }}>
                            <span className="material-icons main_widget">
                                local_dining
                            </span>
                            </div>
                            <div className='widget_alert' style={{visibility: device2_msg}}>alertted!</div>
                        </div>
                        <div className="body_main_item">
                            <div className="device_name">Bathroom</div>
                            <div className="circle" style={{ background: device3_color }} >
                            <span className="material-icons main_widget">
                                wc
                            </span>
                            </div>
                            <div className='widget_alert' style={{visibility: device3_msg}}>alertted!</div>
                        </div>
                    </div>
                    <div className="body_main_control">
                        <div className="body_main_control_log">
                            <div className="body_main_control_title">Log</div>
                            <div className="body_main_control_box">"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?""Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</div>
                        </div>
                        <div className="body_main_control_buttons">
                            <div className="body_main_control_title">Call</div>
                            <div className="body_main_control_box">
                                <div className='temp'>
                                    <p className="App-intro">{state1}</p>
                                    <button onClick={() => {sockEmit(1)}}>emit1</button>
                                    <button onClick={() => {sockEmit(2)}}>emit2</button>
                                    <button onClick={() => {sockEmit(3)}}>emit3</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <footer>
            </footer>
        </div>
    );


}

export default Index