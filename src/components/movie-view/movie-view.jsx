import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button } from 'react-bootstrap';
// scss file 
import './movie-view.scss'

export function MovieView({ movie, onBackClick }) {
    return (
        <Container className='movie-view'>
            <Row>
                <Col className="m-4">
                    <h1 style={{ fontWeight: 700 }}>{movie.Title}</h1>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <p className="text-muted">{movie.Director.Name}</p>
                    </Link>
                    <p>Released: {movie.Released}</p>
                    <p>Rating: {movie.Rating}/10</p>
                    <Link to={`/genres/${movie.Genre.Name}`} style={{ textDecoration: 'none', color: 'none' }}>
                        <p>Genre: {movie.Genre.Name}</p>
                    </Link>
                    <Button variant="warning">Add to favorites</Button>
                </Col>
                <Col>
                    <img className="movie-img" src={movie.ImgPath} />
                </Col>
            </Row>
            <Row className="mt-4">
                <h3>{movie.Description}</h3>
            </Row>

            <Button variant="dark" className="mt-4" size="md" onClick={() => onBackClick()}>Back</Button>
        </Container >
    )
}


MovieView.propTypes = {
    movie: PropTypes.shape({
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
    onBackClick: PropTypes.func.isRequired
}