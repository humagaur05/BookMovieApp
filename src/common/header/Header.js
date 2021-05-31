import React from 'react'
import './Header.css'
import logo from './../../assets/logo.svg';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';



/*
Header component contains logo and login/logout button. 
We determine if user is logged in or not logged in by fetching the access token from session storage
Login and Logout button is shown based on whethr user is logged in or not
It also shows the book show button if header is being displayed in Movie Details page
Login/Register modal is shown only if user is not logged in when either login button or book show button is clicked
*/
const Header =  function Header(props) {

    const isLoggedIn = sessionStorage.getItem("access-token")

    const loginButtonText = isLoggedIn ? "Logout" : "Login"

        return(
            <div className="header">
               <img src={logo} alt="logo" className="rotate"/>
               <span>
                {
                    props.isDetails ? 
                    <Link to={isLoggedIn ? ("/bookshow/" + props.movieId) : "/modal" }>
                        <Button id="bookButton" variant="contained" color="primary"> Book show </Button>
                    </Link> : null
                }
                <span id="spaceSpan"></span>
                {
                    !isLoggedIn ? 
                    <Link to={"/modal"}>
                        <Button id="loginButton" variant="contained" color="default"> {loginButtonText}</Button>
                    </Link> : 
                    <Button id="loginButton" variant="contained" color="default"> {loginButtonText}</Button>
                }
                    
                </span>    
            </div>
        );
}

export default Header;