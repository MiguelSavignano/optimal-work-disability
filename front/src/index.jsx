import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './css/App.scss'

const Confirmationform = React.lazy(() => import("./pages/Confirmationform"))
const Home = React.lazy(() => import("./pages/Home"))

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<div className="loading-spinner">Cargando...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/partes-de-baja" component={Confirmationform} />
      </Switch>
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
)
