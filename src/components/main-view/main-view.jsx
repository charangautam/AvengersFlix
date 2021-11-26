import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// react-bootstrap UI
import { Row, Col } from 'react-bootstrap'
// scss file 
import './main-view.scss'

// embedded conponents
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Topbar } from '../topbar/topbar';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            movies: [],
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
        this.setState({ user: authData.user });

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

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <Route path='/' render={() => {
                    if (user) return <Row>
                        <Col md={12} className="mb-4" style={{ padding: 0 }}>
                            <Topbar onLoggedOut={() => this.onLoggedOut()} />
                        </Col>
                    </Row>
                }} />
                <Row className="justify-content-md-center p-2">

                    {/* login page or main movies page */}
                    <Route exact path='/' render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return movies.map(movie => (
                            <Col sm={6} md={4} lg={3} className="mb-4" key={movie._id}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))
                    }} />

                    {/* register page */}
                    <Route path='/register' render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    {/* profile page */}
                    <Route path='/profile' render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col>
                            <ProfileView user={user} onLoggedOut={() => this.onLoggedOut()} />
                        </Col>
                    }} />

                    {/* movie page */}
                    <Route path='/movies/:movieId' render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* director page */}
                    <Route path='/directors/:directorName' render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView movie={movies.find(m => m.Director.Name === match.params.directorName)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    {/* genre page */}
                    <Route path='/genres/:genreName' render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView movie={movies.find(m => m.Genre.Name === match.params.genreName)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                </Row>
            </Router>
        );
    }
}

