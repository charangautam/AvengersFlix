import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// react-bootstrap UI
import { Card, Button } from 'react-bootstrap';
// scss file 
import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        return (
            <Card>
                <Card.Img variant="top" src={movie.ImgPath} />
                <Card.Body>
                    <Card.Title style={{ fontWeight: 700, fontSize: "20px" }}>{movie.Title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: "20px" }}>{movie.Director.Name}</Card.Subtitle>
                    <Link to={`/movies/${movie._id}`} >
                        <Button variant="info" className="mt-4">Open details</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        ImgPath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired
}