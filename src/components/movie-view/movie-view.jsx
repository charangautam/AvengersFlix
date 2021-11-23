import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'react-bootstrap';
// scss file 
import './movie-view.scss'

export class MovieView extends React.Component {
    render() {
        const { movie, backClick } = this.props;
        return (
            <Container className='movie-view'>
                <Row>
                    <Col className="m-4">
                        <h1 style={{ fontWeight: 700 }}>{movie.Title}</h1>
                        <p className="text-muted">{movie.Director.Name}</p>
                        <p>Released: {movie.Released}</p>
                        <p>Rating: {movie.Rating}/10</p>
                        <p>Genre: {movie.Genre.Name}</p>
                    </Col>
                    <Col>
                        <img className="movie-img" src={movie.ImgPath} />
                    </Col>
                </Row>
                <Row className="m-4">
                    <h3>{movie.Description}</h3>
                </Row>

                <button onClick={() => backClick(null)}>Back</button>
            </Container>
        )
    }
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
    backClick: PropTypes.func.isRequired
}