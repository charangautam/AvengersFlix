import React from 'react';
import { connect } from 'react-redux';

// react-bootstrap UI
import { FloatingLabel, Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
    return (
        <FloatingLabel controlId="formSearch" label="Search" className="mb-3 mt-4">
            <Form.Control type="text" value={props.visibilityFilter} onChange={e => props.setFilter(e.target.value)} placeholder="search" />
        </FloatingLabel>
    )
}

export default connect(null, { setFilter })(VisibilityFilterInput);