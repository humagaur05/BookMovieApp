import { GridList, GridListTile, GridListTileBar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Details.css'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import Header from '../../common/header/Header';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';




// const {id} = useParams();

const Details = function(props) {

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

    function getVideoIdFromTrailerURL() {
        const url = movieDetails.trailer_url
        const splitItems = url.split('=')
        return splitItems[1]
    }

    function ratingTapped(e) {
        e.target.style.color = 'yellow'
    }

    function getReleaseDate(movie) {
        let date = new Date(movie.release_date)
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const requiredDate = date.toLocaleDateString("en-US", options)
        return requiredDate
    }

    return(
        <Fragment>
        <Header isLoggedIn={false} isDetailsPage={true} movieId={props.match.params.id}></Header>
        <Link to="/">
            <Typography className="custom-btn" variant="button" display="block" gutterBottom> &#60; Back to Home</Typography>
        </Link>
        <div id="movieDetails">
            <div id="movieDetailsLeft">
            <img src={movieDetails.poster_url} alt={movieDetails.title} />
            </div>
            <div id="movieDetailsMiddle">
            <Typography variant="headline" component="h2" gutterBottom>{movieDetails.title}</Typography>
            <Typography variant="body1" gutterBottom><b>Genre: </b>{movieDetails.genres.join(", ")}</Typography>
            <Typography variant="body1" gutterBottom><b>Duration: </b>{movieDetails.duration}</Typography>
            <Typography variant="body1" gutterBottom><b>Release Date: </b>{getReleaseDate(movieDetails)}</Typography>
            <Typography variant="body1" gutterBottom><b>Rating: </b>{movieDetails.rating}</Typography>
            <br/>
            <Typography variant="body1" gutterBottom><b>Plot: </b>(<a href={movieDetails.wiki_url}>Wiki Link</a>) {movieDetails.storyline}</Typography>
            <Typography style={{marginTop:'16px'}} variant="body1" gutterBottom><b>Trailer: </b><YouTube videoId={getVideoIdFromTrailerURL()}></YouTube></Typography>
            
            </div>
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
