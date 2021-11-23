import React from 'react';
import PropTypes from 'prop-types';

// react-bootstrap UI
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// scss file 
import './movie-card.scss'
import { CardGroup } from 'react-bootstrap';

export class MovieCard extends React.Component {
    render() {
        const { movie, loadMovie } = this.props;
        return (
            <Card>
                <Card.Img variant="top" src={movie.ImgPath} />
                <Card.Body>
                    <Card.Title style={{ fontWeight: 700 }}>{movie.Title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{movie.Director.Name}</Card.Subtitle>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button variant="info" onClick={() => loadMovie(movie)}>Open details</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImgPath: PropTypes.string.isRequired
    }).isRequired,
    loadMovie: PropTypes.func.isRequired
}