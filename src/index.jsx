import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

// react-bootstrap UI
import Container from 'react-bootstrap/Container';
// scss file
import './index.scss';

// embedded component
import MainView from './components/main-view/main-view';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class AvengersFlixApp extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container fluid className='my-flix'>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(AvengersFlixApp), container);