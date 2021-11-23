import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

// react-bootstrap UI
import Container from 'react-bootstrap/Container';
// scss file
import './index.scss';

// Main component (will eventually use all the others)
class AvengersFlixApp extends React.Component {
    render() {
        return (
            <Container className='my-flix'>
                <MainView />
            </Container>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(AvengersFlixApp), container);