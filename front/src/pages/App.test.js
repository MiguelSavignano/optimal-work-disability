import React from 'react';
import ReactDOM from 'react-dom';
import Confirmationform from './Confirmationform';
// import Home from './Home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Confirmationform />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Home />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
