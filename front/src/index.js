import React from 'react';
import ReactDOM from 'react-dom';
import SimpleReactRouter from 'simple-react-router'
import Home from "./pages/Home"
import Confirmationform from "./pages/Confirmationform"
import registerServiceWorker from './registerServiceWorker';

export default class App extends SimpleReactRouter {
  routes(map){
    map('/',  Home)
    map('/calculo-de-partes-de-baja', Confirmationform)
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
