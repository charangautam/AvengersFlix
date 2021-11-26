import React from 'react'
import PropTypes from 'prop-types';

// react-bootstap UI
import Button from 'react-bootstrap/Button';

export function DirectorView({ movie, onBackClick }) {
    return (
        <div className='director-view'>
            <h1 style={{ fontWeight: 700 }}>{movie.Director.Name}</h1>
            <h4 className="m-4">{movie.Director.Bio}</h4>
            <h4 className="m-4">Age: {movie.Director.Age}</h4>
            <Button className="mt-5" variant="dark" size="md" onClick={() => onBackClick()}>Back</Button>
        </div>
    )
}

DirectorView.propTypes = {
    movie: PropTypes.shape({
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Age: PropTypes.string
        }).isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
}