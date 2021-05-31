import React, { useEffect, useState } from "react";
import "./LoginModal.css";

import Modal from "react-modal";
import { Button, FormControl, FormHelperText, Input, InputLabel, Tab, Tabs } from "@material-ui/core";

/*
Login Modal component contains the tab view showing login and register forms.
*/
export default function LoginModal(props) {

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [loginForm, setLoginForm] = useState({
    username:'',
    password:''
  });

  const [registerForm, setRegisterForm] = useState({
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    contact:''
  });

const [reqUserName, setReqUserName] = useState("dispNone");
const [reqPassword, setReqPassword] = useState("dispNone");

const [reqFirstname, setReqFirstname] = useState("dispNone");
const [reqLastName, setReqLastName] = useState("dispNone");
const [reqEmail, setReqEmail] = useState("dispNone");
const [reqRegisterPassword, setReqRegisterPassword] = useState("dispNone");
const [reqContact, setReqContact] = useState("dispNone");
const [showRegLabel, setShowRegLabel] = useState(false)


//Utility methods
  const tabChangeHandler = (event, newValue) => {
    setShowRegLabel(false);
    setSelectedTab(newValue);
  };

  function exitLoginModal() {
    props.history.push({
      pathname: "/"
    });
  }


  //Login form related methods

  const loginFormChangeHandler = (e) => {
        const state = loginForm;
        state[e.target.name] = e.target.value;
        setLoginForm({...state})
  }

  const loginButtonHandler = () => {
    loginForm.username === "" ? setReqUserName("dispBlock") : setReqUserName("dispNone");
    loginForm.password === "" ? setReqPassword("dispBlock") : setReqPassword("dispNone");
    

    if (
      loginForm.username === "" ||
      loginForm.password === ""
    ) {
      return;
    }
    sendLoginRequest();
  };

  const sendLoginRequest = () => {
    let data = JSON.stringify({
      "username": loginForm.username,
      "password": loginForm.password
    });

    fetch(props.baseUrl + "/auth/login", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": "Basic aHVtYTp0ZXN0"
    }
    })
      .then((response) => {
        sessionStorage.setItem("access-token", response.headers.get("access-token"))
        response.json()
      })
      .then((data) => {
        console.log(data);
        exitLoginModal()
      })
      .catch(error => {
        console.log('error', error)
    });
};


 //Register form related methods

 const registerFormChangeHandler = (e) => {
    const state = registerForm;
    state[e.target.name] = e.target.value;
    setRegisterForm({...state})
}

 const registerButtonHandler = () => {
    setShowRegLabel(false);
    registerForm.firstname === "" ? setReqFirstname("dispBlock") : setReqFirstname("dispNone");
    registerForm.lastname === "" ? setReqLastName("dispBlock") : setReqLastName("dispNone");
    registerForm.email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
    registerForm.password === "" ? setReqRegisterPassword("dispBlock") : setReqRegisterPassword("dispNone");
    registerForm.contact === "" ? setReqContact("dispBlock") : setReqContact("dispNone");
  
  
    if (
      registerForm.firstname === "" ||
      registerForm.lastname === "" ||
      registerForm.email === "" ||
      registerForm.password === "" ||
      registerForm.contact === ""
    ) {
      return;
    }
    sendRegisterRequest()
  };

  const sendRegisterRequest = () => {
      let data = JSON.stringify({
        "email_address": registerForm.email,
        "first_name": registerForm.firstname,
        "last_name": registerForm.lastname,
        "mobile_number": registerForm.contact,
        "password": registerForm.password
      });
  
      const url = props.baseUrl + "/signup";
      fetch(props.baseUrl + "/signup", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
      }
      })
        .then((response) => response.json())
        .then((data) => {
          setShowRegLabel(true);
          console.log(data);
        })
        .catch(error => {
          console.log('error', error)
      });
  };

/*
Tabs contained within modal component
On change of tab, based on the currently selected tab either the login div is shown or the register div is shown
selectedTab = 0, show login div
otherwise, show register div
*/ 

  return (
    <div >

      <Modal
        isOpen={true}
        onRequestClose={exitLoginModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
          <div>
            <Tabs
              value={selectedTab}
              onChange={tabChangeHandler}
              indicatorColor="secondary"
              textColor="primary"
              centered
            >
              <Tab label="LOGIN"/>
              <Tab label="REGISTER" />
            </Tabs>
        
          {
            (selectedTab == 0) ? 
            <LoginDiv
              loginForm={loginForm} 
              loginFormChangeHandler={loginFormChangeHandler} 
              loginButtonHandler={loginButtonHandler}
              reqUserName={reqUserName} 
              reqPassword={reqPassword}
            /> : 
            <RegisterDiv
            registerForm={registerForm}
            registerFormChangeHandler={registerFormChangeHandler}
            registerButtonHandler={registerButtonHandler}
            reqFirstname={reqFirstname} 
            reqLastName={reqLastName} 
            reqEmail={reqEmail}
            reqRegisterPassword={reqRegisterPassword} 
            reqContact={reqContact}
            showRegLabel={showRegLabel}
            />
          }
          </div>
      </Modal>
    </div>
  );
}

/*
Created separate functional components for LoginDiv and RegisterDiv to make code readable
*/ 

function LoginDiv(props) {

  const {loginForm, loginFormChangeHandler, loginButtonHandler, reqUserName, reqPassword} = props;

  return (
  <div id="loginDiv">
    <FormControl required className="formControl">
        <InputLabel htmlFor="username">
          Username
        </InputLabel>
        <Input
          id="username" 
          name="username"
          value={loginForm.username}
          onChange={loginFormChangeHandler}
        />
        <FormHelperText className={reqUserName}>
          <span className="red">Required</span>
        </FormHelperText>
    </FormControl>
    <br/>
    <br/>
    <FormControl required className="formControl">
        <InputLabel htmlFor="password">
          Password
        </InputLabel>
        <Input
          id="password" 
          name="password"
          value={loginForm.password}
          onChange={loginFormChangeHandler}
        />
        <FormHelperText className={reqPassword}>
          <span className="red">Required</span>
        </FormHelperText>
    </FormControl>
    <br/>
    <br/>
    <FormControl>
        <Button variant="contained" color="primary" onClick={loginButtonHandler} className="formControl"> LOGIN </Button>
    </FormControl>
</div>
  );
}


function RegisterDiv(props) {

  const {registerForm, registerFormChangeHandler, registerButtonHandler, reqFirstname, reqLastName, reqEmail, reqRegisterPassword, reqContact, showRegLabel} = props;

  return(
    <div id="registerDiv">
          <FormControl required className="formControl">
              <InputLabel htmlFor="firstname">
                First Name
              </InputLabel>
              <Input
                id="firstname" 
                name="firstname"
                value={registerForm.firstname}
                onChange={registerFormChangeHandler}
              />
              <FormHelperText className={reqFirstname}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className="formControl">
              <InputLabel htmlFor="lastname">
                Last Name
              </InputLabel>
              <Input
                id="lastname" 
                name="lastname"
                value={registerForm.lastname}
                onChange={registerFormChangeHandler}
              />
              <FormHelperText className={reqLastName}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className="formControl">
              <InputLabel htmlFor="email">
                Email
              </InputLabel>
              <Input
                id="email" 
                name="email"
                value={registerForm.email}
                onChange={registerFormChangeHandler}
              />
              <FormHelperText className={reqEmail}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className="formControl">
              <InputLabel htmlFor="password">
                Password
              </InputLabel>
              <Input
                id="password" 
                name="password"
                value={registerForm.password}
                onChange={registerFormChangeHandler}
              />
              <FormHelperText className={reqRegisterPassword}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <br/>
          <FormControl required className="formControl">
              <InputLabel htmlFor="contact">
                Contact
              </InputLabel>
              <Input
                id="contact" 
                name="contact"
                value={registerForm.contact}
                onChange={registerFormChangeHandler}
              />
              <FormHelperText className={reqContact}>
                <span className="red">Required</span>
              </FormHelperText>
          </FormControl>
          <br/>
          <FormControl style={{width:300, margin:'5px'}}>
            {
              showRegLabel ? <InputLabel>Registration successful. Please login!</InputLabel> : null
             
            }
          </FormControl>
          <br/>
          <br/>
          <br/>

          <FormControl>
              <Button variant="contained" color="primary" onClick={registerButtonHandler} className="formControl"> REGISTER </Button>
          </FormControl>
      
          <br/>
          <br/>
        </div>
  )
}