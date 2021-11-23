import React from 'react';
import axios from 'axios';

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

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Row className="justify-content-md-center">
                <Topbar />
                {selectedMovie ?
                    (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} backClick={movie => this.setMovie(movie)} />
                        </Col>
                    ) :
                    (

                        movies.map(movie =>
                            <Col sm={6} md={4} lg={3} className="mb-4">
                                <MovieCard movie={movie} key={movie._id} loadMovie={movie => this.setMovie(movie)} />
                            </Col>
                        )
                    )
                }
            </Row>
        );
    }
}