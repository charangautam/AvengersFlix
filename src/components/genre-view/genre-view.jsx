import React from 'react';
import PropTypes from 'prop-types';

// react-bootstap UI
import Button from 'react-bootstrap/Button';

export function GenreView({ movie, onBackClick }) {
    return (
        <div className="genre-view mt-5">
            <h1 style={{ fontWeight: 700 }}>{movie.Genre.Name}</h1>
            <h4 className="m-4">{movie.Genre.Description}</h4>
            <Button className="mt-5" variant="dark" size="md" onClick={() => onBackClick()}>Back</Button>
        </div>
    )
}

GenreView.propTypes = {
    movie: PropTypes.shape({
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}
