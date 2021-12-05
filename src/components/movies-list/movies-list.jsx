import React from 'react';
import { connect } from 'react-redux';

// // react-bootstrap UI
import Col from 'react-bootstrap/Col'

// embedded components
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
}

function MoviesList({ movies, visibilityFilter }) {
    let filteredMovies = movies

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (movies.length === 0) return <div className="main-view" />;

    return <>
        <Col md={12}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredMovies.map(movie => (
            <Col sm={6} md={4} lg={3} className="mb-4" key={movie._id}>
                <MovieCard movie={movie} />
            </Col>
        ))}
    </>;
}

export default connect(mapStateToProps)(MoviesList);
