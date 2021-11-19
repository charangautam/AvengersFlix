import React from 'react';
import ReactDOM from 'react-dom';

// scss file
import './index.scss';

// Main component (will eventually use all the others)
class AvengersFlixApp extends React.Component {
    render() {
        return (
            <div className='my-flix'>
                <h1>Good night!</h1>
            </div>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(AvengersFlixApp), container);