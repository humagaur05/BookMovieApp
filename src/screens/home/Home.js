import React, { useEffect, useState } from 'react'
import './Home.css'
import { Fragment } from 'react';
import Header from './../../common/header/Header.js'
import { Button, Card, CardContent, CardHeader, Checkbox, FormControl, FormHelperText, GridList, GridListTile, GridListTileBar, Input, InputLabel, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { createMuiTheme} from "@material-ui/core/styles";
import { blue, red } from '@material-ui/core/colors';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Details from './../details/Details'




const Home = function(props) {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    let [originalReleasedMovies, setOriginalReleasedMovies] = useState([]);

    const [filterMovieForm, setFilterMovieForm] = useState({
        movieName:'',
        selectedGenres:[],
        selectedArtists:[],
        selectedReleaseDateStart:new Date('2099-01-01'),
        selectedReleaseDateEnd:new Date('1500-01-01')
    });

    const inputChangedHandler = (e) => {
        const state = filterMovieForm;
        state[e.target.name] = e.target.value;
        setFilterMovieForm({...state})
    }

    
 
    const {movieName, selectedGenres, selectedArtists, selectedReleaseDateStart, selectedReleaseDateEnd} = filterMovieForm;

    function isGenreSelected(currentGenre) {
        const filteredGenres = selectedGenres.filter((item) => {
            return item === currentGenre.genre
        })

        const isSelected = filteredGenres.length > 0
        return isSelected
    }

    function isArtistSelected(currentArtist) {
        const filteredArtists = selectedArtists.filter((item) => {
            return item === (currentArtist.first_name + " " + currentArtist.last_name)
        })

        const isSelected = filteredArtists.length > 0
        return isSelected
    }

    useEffect(() => {

    function fetchMovies() {
        fetch(props.baseUrl+"/movies?limit=20", {
            method:"GET"
        })
        .then(response => response.json())
        .then(data => {
            const releasedMovies = data.movies.filter((movie) => movie.status === "RELEASED")
            const upcomingMovies = data.movies.filter((movie) => movie.status === "PUBLISHED")
            setOriginalReleasedMovies(releasedMovies)
            setReleasedMovies(releasedMovies)
            setUpcomingMovies(upcomingMovies)
        });
    }

    function fetchGenre() {
        fetch(props.baseUrl+"/genres", {
            method:"GET"
        })
        .then(response => response.json())
        .then(data => {
           setGenres(data.genres);
        });
    }

    function fetchArtists() {
        fetch(props.baseUrl+"/artists", {
            method:"GET"
        })
        .then(response => response.json())
        .then(data => {
           setArtists(data.artists);
        });
    }

    fetchMovies()
    fetchGenre()
    fetchArtists()
    }, [])

    function applyFilter() {
        const filteredMovies = originalReleasedMovies.filter((movie) => {
            const genresMatched = filterMovieForm.selectedGenres.some( ai => movie.genres.includes(ai) ) || filterMovieForm.selectedGenres.length == 0;
            let artistsMatched = filterMovieForm.selectedArtists.some( (ai) => {
                const movieArtistNames = movie.artists.map(artist => artist.first_name + " " + artist.last_name)
                return movieArtistNames.includes(ai)
            });

            artistsMatched = artistsMatched || filterMovieForm.selectedArtists.length == 0;
            
            const movieTitleMatched = (movie.title.toLowerCase().includes(filterMovieForm.movieName.toLowerCase())) || (filterMovieForm.movieName === "")
        
            const movieDate = new Date(movie.release_date)
            const releaseStartDate = new Date(filterMovieForm.selectedReleaseDateStart)
            const releaseEndDate = new Date(filterMovieForm.selectedReleaseDateEnd)
            const isBeforeEndReleaseDate =  movieDate <= releaseEndDate
            const isAfterStartReleaseDate = movieDate >= releaseStartDate
            const isWithinDateRange = isBeforeEndReleaseDate && isAfterStartReleaseDate
            return (movieTitleMatched && genresMatched && artistsMatched && isWithinDateRange) 
        })

        setReleasedMovies(filteredMovies)
    }

    return (
        <Fragment>
            <Header></Header>
            <div id="homeHeader">Upcoming movies</div>

            <GridList cellHeight={250} cols={6} style={{flexWrap:'nowrap', transform:'translateZ(0)'}}>
                { upcomingMovies.map((movie) => (
                    <GridListTile key={movie.id}>
                        <img src={movie.poster_url} alt={movie.title} />
                        <GridListTileBar title={movie.title}/>
                    </GridListTile>
                ))}
            </GridList>


            <div id="releasedMovies">
                <div id="releasedMovieChild1">
                    <GridList cellHeight={350} cols={4}>
                        { releasedMovies.map((movie) => (
                            <GridListTile key={movie.id} style={{margin:'10px'}}>
                                    <Link to={"/movie/" + movie.id}>
                                    <img class="releasedMovieImage" src={movie.poster_url} alt={movie.title} />
                                    </Link>
                                <GridListTileBar title={movie.title} subtitle={<span>Release date:: {Date(movie.release_date)}</span>}/>
                            </GridListTile>
                        ))}
                     </GridList>
                </div>
                <div id="releasedMovieChild2">
                    <Card>
                    
                        <CardContent >
                        <Typography variant="headline" component="h3" style={{color:createMuiTheme().palette.primary.light}}>
                            FIND MOVIES BY:
                        </Typography>

                        <FormControl  className="filterFormControl">
                            <TextField
                                label="Movie Name" 
                                id="movieName"
                                type="text"
                                name="movieName"
                                onChange={inputChangedHandler}
                                value={movieName}
                                style={{ margin: createMuiTheme().spacing.unit, minWidth:240, maxWidth:240}}>
                            </TextField>
                            </FormControl>

                            
                            {/* <Select label="Genre" id="selectedGenres" name="selectedGenres" multiple  value={selectedGenres} onChange={inputChangedHandler} 
                                    value={selectedGenres} renderValue={(data) => data.join(", ")} style={{ margin: createMuiTheme().spacing.unit, minWidth:240, maxWidth:240}}>
                                {genres.map((genreItem) => (
                                <MenuItem key={genreItem.id} value={genreItem.genre}>
                                    <Checkbox checked={isGenreSelected(genreItem)} />
                                    <ListItemText primary={genreItem.genre} />
                                </MenuItem>
                                ))}
                            </Select> */}

                            <FormControl>
                                <InputLabel htmlFor="selectedGenres" style={{ marginLeft: createMuiTheme().spacing.unit}}>Genre</InputLabel>
                                <Select label="Genre" id="selectedGenres" name="selectedGenres" multiple  value={selectedGenres} onChange={inputChangedHandler} 
                                    value={selectedGenres} renderValue={(data) => data.join(", ")} style={{ margin: createMuiTheme().spacing.unit, minWidth:240, maxWidth:240}}>
                                    {genres.map((genreItem) => (
                                    <MenuItem key={genreItem.id} value={genreItem.genre}>
                                        <Checkbox checked={isGenreSelected(genreItem)} />
                                        <ListItemText primary={genreItem.genre} />
                                    </MenuItem>
                                    ))};
                                </Select>
                                
                            </FormControl>

                            <FormControl>
                            <InputLabel htmlFor="selectedArtists" style={{ marginLeft: createMuiTheme().spacing.unit}}>Artist</InputLabel>
                            <Select id="selectedArtists" name="selectedArtists" multiple  value={selectedArtists} onChange={inputChangedHandler} 
                             renderValue={(artistData) => artistData.join(", ")} style={{ margin: createMuiTheme().spacing.unit, minWidth:240, maxWidth:240}}>
                                {artists.map((artistItem) => (
                                <MenuItem key={artistItem.id} value={artistItem.first_name + " " + artistItem.last_name}>
                                    <Checkbox checked={isArtistSelected(artistItem)} />
                                    <ListItemText primary={artistItem.first_name + " " + artistItem.last_name} />
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>

                            <FormControl>
                                <TextField type="date" id="selectedReleaseDateStart" name="selectedReleaseDateStart" value={selectedReleaseDateStart} label="Release date start" onChange={inputChangedHandler} style={{ margin: createMuiTheme().spacing.unit, minWidth:240, maxWidth:240}}></TextField>
                            </FormControl>
                          
                            <FormControl>
                                <TextField type="date" id="selectedReleaseDateEnd" name="selectedReleaseDateEnd" value={selectedReleaseDateEnd} label="Release date end" onChange={inputChangedHandler} style={{ margin: createMuiTheme().spacing.unit, minWidth:240, maxWidth:240}}></TextField>
                            </FormControl>
                                <br/><br/>
                            <FormControl>
                                    <Button variant="contained" color="primary" onClick={applyFilter} style={{ margin: createMuiTheme().spacing.unit, minWidth:240, maxWidth:240}}> APPLY </Button>
                          </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </Fragment>
    );
}



export default Home;