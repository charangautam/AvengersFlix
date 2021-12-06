import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// // react-bootstrap UI
import Col from 'react-bootstrap/Col'

// embedded components
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

function MoviesList({ movies, visibilityFilter }) {
    let filteredMovies = movies

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (movies.length === 0) return <div className="main-view" />;

    return <>
        <Col md={12}>
            <VisibilityFilterInput />
        </Col>
        {filteredMovies.map(movie => (
            <Col sm={6} md={4} lg={3} className="mb-4" key={movie._id}>
                <MovieCard movie={movie} />
            </Col>
        ))}
    </>;
}

const mapStateToProps = state => {
    const { visibilityFilter, movies } = state;
    return { visibilityFilter, movies };
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
    movies: PropTypes.array.isRequired,
    visibilityFilter: PropTypes.string.isRequired
}
