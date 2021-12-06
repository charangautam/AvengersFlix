import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col, Button } from 'react-bootstrap';
// scss file 
import './movie-view.scss'

export function MovieView({ movie, user, setUser, onBackClick }) {

    const addToFave = () => {
        console.log(movie._id)
        axios.post(`https://avengers-database.herokuapp.com/users/${user.Username}/movies/${movie._id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => {
                console.error(err)
            });
    }

    const pullFromFave = () => {
        axios.delete(`https://avengers-database.herokuapp.com/users/${user.Username}/movies/${movie._id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(err => {
                console.error(err)
            });
    }

    return (
        <Container className='movie-view'>
            <Row>
                <Col className="m-4">
                    <h1 style={{ fontWeight: 700 }}>{movie.Title}</h1>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <p className="text-secondary">{movie.Director.Name}</p>
                    </Link>
                    <p><span className="text-muted">Released:</span> {movie.Released}</p>
                    <p><span className="text-muted">Rating:</span> {movie.Rating}/10</p>
                    <Link to={`/genres/${movie.Genre.Name}`} style={{ textDecoration: 'none', color: 'none' }}>
                        <p><span className="text-muted">Genre:</span> {movie.Genre.Name}</p>
                    </Link>
                    {user.FavoriteMovies.includes(movie._id)
                        ? <Button variant="danger" onClick={pullFromFave}>Remove from favorites</Button>
                        : <Button variant="warning" onClick={addToFave}>Add to favorites</Button>
                    }
                </Col>
                <Col>
                    <img className="movie-img" src={movie.ImgPath} alt={`Movie poster of ${movie.Title}`} />
                </Col>
            </Row>
            <Row className="mt-4">
                <h3>{movie.Description}</h3>
            </Row>
            <Button variant="dark" className="mt-4" size="md" onClick={() => onBackClick()}>Back</Button>
        </Container >
    )
}

const mapStateToProps = state => {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps)(MovieView);


MovieView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImgPath: PropTypes.string.isRequired,
        Released: PropTypes.string.isRequired,
        Rating: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        FavoriteMovies: PropTypes.array.isRequired
    }).isRequired,
    setUser: PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired
}