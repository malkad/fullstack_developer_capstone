import React, { useState } from 'react';

import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [open,setOpen] = useState(true)

    let login_url = window.location.origin+"/djangoapp/login";

    const login = async (e) => {
        e.preventDefault();

        const res = await fetch(login_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userName": userName,
                "password": password
            }),
        });

        const json = await res.json();
        if (json.status != null && json.status === "Authenticated") {
            sessionStorage.setItem('username', json.userName);
            setOpen(false);
        }
        else {
        alert("The user could not be authenticated.")
        }
    };

    if (!open) {
        window.location.href = "/";
    };

    return (
    <div>
        <Header/>
        <div onClick={onClose}>
            <div
                onClick={(e) => {
                e.stopPropagation();
                }}
                className='login-container mb-3'
            >
                <form className="login_panel p-3" style={{}} onSubmit={login}>
                    <div class="mb-3 input-group">
                        <span class="input-group-text bi bi-person" id="label-username"></span>
                        <input aria-describedby="label-username" type="text"  name="username" placeholder="Username" className="form-control" onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text bi bi-shield-lock" id="label-psw"></span>
                        <input aria-describedby="form-psw" name="psw" type="password"  placeholder="Password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3 d-flex">
                        <button type="submit" class="btn btn-primary flex-fill">Login</button>
                        <button type="button" class="btn btn-secondary flex-fill" onClick={()=>setOpen(false)}>Cancel</button>
                    </div>
                    <a className="loginlink" href="/register">Register Now</a>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Login;
