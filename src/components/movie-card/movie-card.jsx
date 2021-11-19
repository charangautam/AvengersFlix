import React from 'react';

export class MovieCard extends React.Component {
    render() {
        const { movie, loadMovie } = this.props;
        return (
            <div className='movie-card' onClick={() => loadMovie(movie)}>
                <h1>{movie.Title}</h1>
            </div>
        )
    }
}