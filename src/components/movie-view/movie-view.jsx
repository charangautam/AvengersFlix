import React from 'react';
import PropTypes from 'prop-types';

// scss file 
import './movie-view.scss'

export class MovieView extends React.Component {
    render() {
        const { movie, backClick } = this.props;
        return (
            <div className='movie-view'>
                <img src={movie.ImgPath} />
                <h1>{movie.Title}</h1>
                <h2>{movie.Description}</h2>
                <button onClick={() => backClick(null)}>Back</button>
            </div>
        )
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImgPath: PropTypes.string.isRequired
    }).isRequired,
    backClick: PropTypes.func.isRequired
}