import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Details from './details/Details.js'
import Home from './home/Home.js'




export default function Controller(props) {
    const baseUrl = "http://localhost:8085/api/v1"
    return(
        <Router>
            <div>
            <Route exact path="/" render={ (props) => <Home {...props} baseUrl={baseUrl} /> }/>
            <Route path="/movie/:id" render={ (props) => <Details {...props} baseUrl={baseUrl}/> }/>
            </div>
        </Router>
            
    )
}