import React from 'react'
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router'
import Main from './src/page/index.js'
import ReactComponent from './src/demo/index.js'

export const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Main}/> 
      </Route> 
      <Route path="/react" component={ReactComponent} />
    </Router>
  )
}
