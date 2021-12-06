import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// react-bootstrap UI
import { FloatingLabel, Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput({ visibilityFilter, setFilter }) {
    return (
        <FloatingLabel controlId="formSearch" label="Search" className="mb-3 mt-4">
            <Form.Control type="text" value={visibilityFilter} onChange={e => setFilter(e.target.value)} placeholder="search" />
        </FloatingLabel>
    )
}

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
}

export default connect(mapStateToProps, { setFilter })(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
    visibilityFilter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired
}