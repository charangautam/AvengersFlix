import React from 'react';
import axios from 'axios';

// embedded conponents
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            movies: [],
            selectedMovie: null
        }
    }

    componentDidMount() {
        axios.get('https://avengers-database.herokuapp.com/movies/')
            .then(response => {
                this.setState({ movies: response.data });
            })
            .catch(err => {
                console.error(err)
            })
    }

    onLoggedIn(user) {
        this.setState({ user })
    }

    setMovie(movie) {
        this.setState({ selectedMovie: movie });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        if (selectedMovie) return <MovieView movie={selectedMovie} backClick={movie => this.setMovie(movie)} />

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard movie={movie} key={movie._id} loadMovie={movie => this.setMovie(movie)} />)}
            </div>
        );
    }
}