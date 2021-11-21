import React from 'react';
import PropTypes from 'prop-types';

// scss file 
import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movie, loadMovie } = this.props;
        return (
            <div className='movie-card' onClick={() => loadMovie(movie)}>
                <h1>{movie.Title}</h1>
            </div>
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