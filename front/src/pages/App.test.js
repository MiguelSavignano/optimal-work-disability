import React from 'react';
import ReactDOM from 'react-dom';
import Confirmationform from './Confirmationform';
import Home from './Home';
import fetch from 'fetch-vcr';

fetch.configure({
  fixturePath: './_fixtures',
  mode: 'cache'
})

global.fetch = fetch

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Confirmationform />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Home renders without crashing', (done) => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
  setTimeout(() => {
    ReactDOM.unmountComponentAtNode(div);
    done()
  }, 500)
});
