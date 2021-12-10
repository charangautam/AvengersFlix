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

// redux store
const store = createStore(moviesApp);

ReactDOM.render(
  <Provider store={store}>
    <Container fluid className='my-flix'>
      <MainView />
    </Container>
  </Provider>,
  document.getElementById('root')
);

