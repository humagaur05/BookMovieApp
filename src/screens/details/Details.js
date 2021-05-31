import { GridList, GridListTile, GridListTileBar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Details.css'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import Header from '../../common/header/Header';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';

/*
Details page is divided into left, middle and right parts. 
Achieved using diplay flex 
*/

const Details = function(props) {

    //Movie details state
    const [movieDetails, setMovieDetails] = useState({
        title:"",
        genres:[],
        duration:0,
        release_date:"",
        rating:0.0,
        wiki_url:"",
        storyline:"",
        trailer_url:"",
        artists:[]
    });

    //Movie rating state to populate the star rating UI
    const [movieRating, setMovieRating] = useState(0);

    useEffect(() => {
        fetch(props.baseUrl+`/movies/${props.match.params.id}`, {
            method:"GET"
        })
        .then(response => response.json())
        .then(data => {
            setMovieDetails(data)
        });
    }, [])

    //Utility method to extract video id from the trailer url
    function getVideoIdFromTrailerURL() {
        const url = movieDetails.trailer_url
        const splitItems = url.split('=')
        return splitItems[1]
    }

    // Function to change the color of clicked star to yellow
    function ratingTapped(e) {
        e.target.style.color = 'yellow'
    }

    function getReleaseDateInRequiredFormat(movie) {
        let date = new Date(movie.release_date)
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const requiredDate = date.toLocaleDateString("en-US", options)
        return requiredDate
    }

    return(
        <Fragment>
            <Header isDetails={true} movieId={props.match.params.id}></Header>
            <Link to="/">
                <Typography className="custom-btn" variant="button" display="block" gutterBottom> &#60; Back to Home</Typography>
            </Link>
            <div id="movieDetails">

                {/* Left part of screen */}
                <div id="movieDetailsLeft">
                    <img src={movieDetails.poster_url} alt={movieDetails.title} />
                </div>

                {/* Middle part of screen showing movie info and trailer */}
                <div id="movieDetailsMiddle">
                    <Typography variant="headline" component="h2" gutterBottom>{movieDetails.title}</Typography>
                    <Typography variant="body1" gutterBottom><b>Genre: </b>{movieDetails.genres.join(", ")}</Typography>
                    <Typography variant="body1" gutterBottom><b>Duration: </b>{movieDetails.duration}</Typography>
                    <Typography variant="body1" gutterBottom><b>Release Date: </b>{getReleaseDateInRequiredFormat(movieDetails)}</Typography>
                    <Typography variant="body1" gutterBottom><b>Rating: </b>{movieDetails.rating}</Typography>
                    <br/>
                    <Typography variant="body1" gutterBottom><b>Plot: </b>(<a href={movieDetails.wiki_url}>Wiki Link</a>) {movieDetails.storyline}</Typography>
                    <Typography style={{marginTop:'16px'}} variant="body1" gutterBottom><b>Trailer: </b><YouTube videoId={getVideoIdFromTrailerURL()}></YouTube></Typography>
                
                </div>

                {/* Right part of screen showing star rating and artists*/}
                <div id="movieDetailsRight">
                    <Typography variant="body1" gutterBottom><b>Rate this movie:</b></Typography>
                    <div>
                        <StarBorderIcon id="star1" onClick={ratingTapped}></StarBorderIcon>
                        <StarBorderIcon id="star2" onClick={ratingTapped}></StarBorderIcon>
                        <StarBorderIcon id="star3" onClick={ratingTapped}></StarBorderIcon>
                        <StarBorderIcon id="star4" onClick={ratingTapped}></StarBorderIcon>
                        <StarBorderIcon id="star5" onClick={ratingTapped}></StarBorderIcon>
                    </div>
                    <Typography id="artistTitle" variant="body1" gutterBottom><b>Artists:</b></Typography>
                    <GridList cols={2}>
                    { movieDetails.artists.map((artist) => (
                        <GridListTile key={artist.id}>
                            <img src={artist.profile_url} alt={artist.first_name} />
                            <GridListTileBar title={artist.first_name + " "+ artist.last_name}/>
                        </GridListTile>
                    ))}
                </GridList>
                </div>
            </div>
        </Fragment>
    )
}


export default Details;
