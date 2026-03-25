import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import SimpleReactRouter from 'simple-react-router'

const Confirmationform = React.lazy(() => import("./pages/Confirmationform"))
const Home = React.lazy(() => import("./pages/Home"))

export default class App extends SimpleReactRouter {
  routes(map){
    map('/',  Home)
    map('/partes-de-baja', Confirmationform)
  }
}

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
