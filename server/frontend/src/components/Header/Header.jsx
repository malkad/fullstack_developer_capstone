import React from 'react';
import "../assets/style.css";

const Header = () => {
    const logout = async (e) => {
        e.preventDefault();
        let logout_url = window.location.origin+"/djangoapp/logout";
        const res = await fetch(logout_url, {
            method: "GET",
        });

        const json = await res.json();
        console.log('res', json);
        if (json) {
            let username = sessionStorage.getItem('username');
            sessionStorage.removeItem('username');
            window.location.href = window.location.origin;
            window.location.reload();
            alert("Logging out "+username+"...")
        }
        else {
            alert("The user could not be logged out.")
        }
    };

    //The default home page items are the login details panel
    let home_page_items =  <div></div>

    //Gets the username in the current session
    let curr_user = sessionStorage.getItem('username')

    //If the user is logged in, show the username and logout option on home page
    if ( curr_user !== null &&  curr_user !== "") {
        home_page_items = <div className="input_panel">
            <text className='username'>{sessionStorage.getItem("username")}</text>
            <a className="logout" href="/djangoapp/logout" onClick={logout}>Logout</a>
        </div>
    }

    return (
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark navbar-shadow">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Dealerships</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <a class="nav-link active" style={{fontSize: "larger"}} aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style={{fontSize: "larger"}} href="/about">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style={{fontSize: "larger"}} href="/contact">Contact Us</a>
                    </li>
                </ul>
                <span class="navbar-text">
                    <div class="loginlink" id="loginlogout">
                        {home_page_items}
                    </div>
                </span>
            </div>
        </div>
    </nav>
    )
}

export default Header
