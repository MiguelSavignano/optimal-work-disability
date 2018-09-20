import React from 'react'
import ReactDOM from 'react-dom'
import SimpleReactRouter from 'simple-react-router'
import registerServiceWorker from './registerServiceWorker'
import Loadable from 'loadable-react'

const Confirmationform = Loadable(() => import("./pages/Confirmationform"))
const Home = Loadable(() => import("./pages/Home"))

export default class App extends SimpleReactRouter {
  routes(map){
    map('/',  Home)
    map('/partes-de-baja', Confirmationform)
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
