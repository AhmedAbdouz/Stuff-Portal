import React, { useState } from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import { useLocalStorage } from '../useLocalStorage';
import ResetPassword from "./ResetPassword";


function Login() {

    const history=useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [radio, setRadio] = useState(null);
    const [flag, setflag] = useState(false);
    const [userID, setUserID] = useState(false);

    function handleChange(event) {
        if (event.target.name == "email")
            setEmail(event.target.value);
        else
            setPassword(event.target.value);
    };

    function checkRadio(event) {
        setRadio(event.target.value);
    }

    const postlogin = {
        email: email,
        password: password,
        staffType: radio
    };



    function handleLogin(event) {
        event.preventDefault();
        axios.post(`http://localhost:4000/login`, postlogin)
            .then(res => {
                console.log("xasn,ncx,zmcm,zxbcmmzxb,cbxzbm,cbzcb,");
                if (res.data.message == "change password") {  // needs to change the password and delete his authantication 
                    setUserID(res.data.id);
                    setflag(true);
                    setMessage("You need to change your Password");
                }
                else if (res.data.message=="loged in " ) {
                    console.log(res);
                    history.push("/profile");                
                }
                else {
                    setMessage(res.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }





    return (
        <div className="container mt-5" >
            <h1>Login</h1>

            <div className="row" >
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">

                            <div className="form-group">
                                <label >Email</label>
                                <input type="email" className="form-control" name="email" value={email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label >login as</label>
                                <br />
                                <input className="logintype" type="radio" name="type" value="1" onChange={checkRadio} />
                                <label>HR</label>
                                <br />
                                <input className="logintype" type="radio" name="type" value="2" onChange={checkRadio} />
                                <label>AC Member</label>
                            </div>
                            <button type="submit" className="btn btn-dark" onClick={handleLogin}>Login</button>

                            <p className="message">{message}</p>

                        </div>
                    </div>

                </div>
            </div>

            {flag ? <ResetPassword userID = {userID}/> : null}

        </div>
    );


};

export default Login;