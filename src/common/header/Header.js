import React from 'react'
import './Header.css'
import logo from './../../assets/logo.svg';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';




const Header =  function Header(props) {

    const buttonText = props.isLoggedIn ? "Logout" : "Login"
    
    if(!props.isDetails) {
    return(
        <div className="header">
           <img id="headerIcon" src={logo} alt="logo" className="rotate"/>
           <Link to={"/modal"}>
            <Button id="loginButton" variant="contained" color="default"> {buttonText}</Button>
            </Link>
        </div>
    );
    } else {
        return(
            <div className="header">
               <img src={logo} alt="logo" className="rotate"/>
               <span>
               <Link to={"/bookshow/" + props.movieId}>
                    <Button id="bookButton" variant="contained" color="primary"> Book show </Button>
                </Link>
                    <span id="spaceSpan"></span>
                    <Link to={"/modal"}>
                        <Button id="loginButton" variant="contained" color="default"> {buttonText}</Button>
                    </Link>
                </span>    
            </div>
        );
    }
}

export default Header;