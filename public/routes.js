import React from 'react'
import { Router, Route, browserHistory, IndexRedirect, IndexRoute } from 'react-router'
import Main from './src/main.js'
import Admin from './src/admin/index.js'
import Panel from './src/admin/panel.js'
import PanelAddFact from './src/admin/panel/panel-add-fact.js'
import PanelFactList from './src/admin/panel/panel-fact-list.js'
import PanelUserList from './src/admin/panel/panel-user-list.js'

export const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Panel}>
        <IndexRoute component={PanelFactList}/>
        <Route path="/addfact" component={PanelAddFact} />
        <Route path="/factlist" component={PanelFactList} />
        <Route path="/userlist" component={PanelUserList} />
      </Route>
    </Router>
  )
}
