import React from 'react';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'The Avengers', Description: 'desc1...', ImagePath: '...' },
                { _id: 2, Title: 'Avengers: Infinity War', Description: 'desc2...', ImagePath: '...' },
                { _id: 3, Title: 'Avengers: End Game', Description: 'desc3...', ImagePath: '...' }
            ]
        }
    }

    render() {
        const { movies } = this.state;
        if (movies.length === 0) {
            return <div className="main-view">The list is empty!</div>;
        }

        return (
            <div className="main-view">
                {movies.map(movie => <h1 key={movie._id}>{movie.Title}</h1>)}
            </div>
        );
    }
}