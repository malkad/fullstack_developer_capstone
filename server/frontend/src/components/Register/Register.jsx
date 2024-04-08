import React, { useState } from "react";
import Header from '../Header/Header';
import "./Register.css";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");

    const gohome = () => {
        window.location.href = window.location.origin;
    };

    const register = async (e) => {
        e.preventDefault();

        let register_url = window.location.origin + "/djangoapp/register";

        const res = await fetch(register_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email,
            }),
        });

        const json = await res.json();
        if (json.status) {
            sessionStorage.setItem("username", json.userName);
            window.location.href = window.location.origin;
        } else if (json.error === "Already Registered") {
            alert("The user with same username is already registered");
            window.location.href = window.location.origin;
        }
    };

    return (
    <div>
    <Header />
    <div className="register-container container">
        <div class="card shadow-lg">
            <div class="card-header d-flex">
                <div class="title flex-fill">
                    <span class="text">
                        SignUp
                    </span>
                </div>
                <div class="close">
                    <a href="/" onClick={() => {gohome();}}>
                        <span class="bi bi-x-circle"></span>
                    </a>
                </div>
            </div>

            <form class="card-body" onSubmit={register}>
                <div className="inputs">
                    <div class="mb-3 input-group">
                        <span class="input-group-text bi bi-person" id="label-username"></span>
                        <input
                            aria-describedby="label-username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="form-control"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text bi bi-person" id="label-firstname"></span>
                        <input
                            aria-describedby="label-firstname"
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            className="form-control"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text bi bi-person" id="label-lastname"></span>
                        <input
                            aria-describedby="label-lastname"
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            className="form-control"
                            onChange={(e) => setlastName(e.target.value)}
                        />
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text" id="label-email">@</span>
                        <input
                            aria-describedby="label-email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text bi bi-shield-lock" id="label-password"></span>
                        <input
                            aria-describedby="label-password"
                            type="password"
                            name="psw"
                            placeholder="Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div class="mb-3 d-flex register-btn">
                    <button type="submit" class="btn btn-primary flex-fill">Register</button>
                </div>
            </form>
        </div>
    </div>
    </div>
    );
};

export default Register;
