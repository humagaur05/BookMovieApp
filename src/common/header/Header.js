import React from 'react'
import './Header.css'
import logo from './../../assets/logo.svg';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';



const Header =  function Header(props) {

    const buttonText = props.isLoggedIn ? "Logout" : "Login"

    const styles = theme => ({
        buttonPadding: {    
          padding: '30px',   
        },
      });
    
    if(!props.isDetailsPage) {
    return(
        <div className="header">
           <img id="headerIcon" src={logo} alt="logo" />
            <Button id="loginButton" variant="contained" color="default"> {buttonText}</Button>
        </div>
    );
    } else {
        return(
            <div className="header">
               <img id="headerIcon" src={logo} alt="logo" />
               <span>
               <Link to={"/bookshow/" + props.movieId}>
                    <Button id="bookButton" variant="contained" color="primary"> Book show </Button>
                </Link>
                    <span id="spaceSpan"></span>
                    <Button id="loginButton" variant="contained" color="default"> {buttonText}</Button>
                </span>    
            </div>
        );
    }
}

export default Header;