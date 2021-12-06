import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// react-bootstrap UI
import { Row, Col } from 'react-bootstrap'

// actions
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

// embedded conponents
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Topbar } from '../topbar/topbar';
import ProfileView from '../profile-view/profile-view';
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

class MainView extends React.Component {

    getMovies(token) {
        axios.get('https://avengers-database.herokuapp.com/movies/', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data.sort((a, b) => b.Released - a.Released))
            })
            .catch(err => {
                console.error(err)
            });
    }

    onLoggedIn(authData) {
        this.props.setUser(authData.user);

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', JSON.stringify(authData.user));
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.setUser(null);
    }

    setUser(user) {
        this.props.setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    componentDidMount() {
        let jwtToken = localStorage.getItem('token');
        if (jwtToken !== null) {
            this.props.setUser(JSON.parse(localStorage.getItem('user')));
            this.getMovies(jwtToken);
        }
    }

    render() {
        const { movies, user } = this.props;

        return (
            <Router>
                <Route path='/' render={() => {
                    if (user) return <Row>
                        <Col md={12} style={{ padding: 0 }}>
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
                        return <MoviesList />
                    }} />

                    {/* register page */}
                    <Route path='/register' render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                    {/* profile page */}
                    <Route path='/profile' render={({ history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={12}>
                            <ProfileView setUser={user => this.setUser(user)}
                                onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()}
                            />
                        </Col>
                    }} />

                    {/* movie page */}
                    <Route path='/movies/:movieId' render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                                setUser={user => this.setUser(user)} onBackClick={() => history.goBack()}
                            />
                        </Col>
                    }} />

                    {/* director page */}
                    <Route path='/directors/:directorName' render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView movie={movies.find(m => m.Director.Name === match.params.directorName)}
                                onBackClick={() => history.goBack()}
                            />
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

let mapStateToProps = state => {
    const { movies, user } = state;
    return { movies, user };
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

MainView.propTypes = {
    movies: PropTypes.array,
    user: PropTypes.any,
    setMovies: PropTypes.func,
    setUser: PropTypes.func
}
