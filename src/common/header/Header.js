import React from 'react'
import './Header.css'
import logo from './../../assets/logo.svg';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';




const Header =  function Header(props) {

    const isLoggedIn = sessionStorage.getItem("access-token")

    const buttonText = isLoggedIn ? "Logout" : "Login"

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
                            <Button id="loginButton" variant="contained" color="default"> {buttonText}</Button>
                        </Link> : 
                        <Button id="loginButton" variant="contained" color="default"> {buttonText}</Button>
                    }
                    
                </span>    
            </div>
        );
}

export default Header;