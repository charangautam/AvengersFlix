import React from 'react';

export class MovieView extends React.Component {
    render() {
        const { movie, backClick } = this.props;
        return (
            <div className='movie-view'>
                <img src={movie.ImagePath} />
                <h1>{movie.Title}</h1>
                <h2>{movie.Description}</h2>
                <button onClick={() => backClick(null)}>Back</button>
            </div>
        )
    }
}