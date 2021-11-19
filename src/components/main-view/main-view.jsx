import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'The Avengers', Description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg' },
                { _id: 2, Title: 'Avengers: Infinity War', Description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg' },
                { _id: 3, Title: 'Avengers: End Game', Description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg' }
            ],
            selectedMovie: null
        }
    }

    setMovie(movie) {
        this.setState({ selectedMovie: movie });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} backClick={movie => this.setMovie(movie)} />

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard movie={movie} key={movie._id} loadMovie={movie => this.setMovie(movie)} />)}
            </div>
        );
    }
}