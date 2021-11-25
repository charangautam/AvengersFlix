import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// react-bootstrap UI
import { Row, Col } from 'react-bootstrap'
// scss file 
import './main-view.scss'

// embedded conponents
import { Topbar } from '../topbar/topbar';
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

    getMovies(token) {
        axios.get('https://avengers-database.herokuapp.com/movies/', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({ movies: response.data })
            })
            .catch(err => {
                console.error(err)
            });
    }

    onLoggedIn(authData) {
        this.setState({ user: authData.user.Username });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({ user: null });
    }

    componentDidMount() {
        let jwtToken = localStorage.getItem('token');
        if (jwtToken !== null) {
            this.setState({ user: localStorage.getItem('user') });
            this.getMovies(jwtToken)
        }
    }

    setMovie(movie) {
        this.setState({ selectedMovie: movie });
    }

    render() {
        const { movies, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Row styles={{ margin: 0 }}>
                    <Col md={12} className="mb-4" style={{ padding: 0 }}>
                        <Topbar onLoggedOut={() => this.onLoggedOut()} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center p-2">
                    <Routes>
                        <Route exact path='/' render={() => {
                            return movies.map(movie =>
                                <Col sm={6} md={4} lg={3} className="mb-4" key={movie._id}>
                                    <MovieCard movie={movie} />
                                </Col>
                            )
                        }} />

                        <Route path='/movies/:movieId' render={({ match }) => {
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                            </Col>
                        }} />

                        <Route path='/genres/:genreName' render={({ match }) => {
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <GenreView movie={movies.find(m => m.Genre.Name === match.params.genreName)} />
                            </Col>
                        }} />

                        <Route path='/directors/:directorName' render={({ match }) => {
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col md={8}>
                                <DirectorView movie={movies.find(m => m.Director.Name === match.params.directorName)} />
                            </Col>
                        }} />
                    </Routes>
                </Row>
            </Router>
        );
    }
}

