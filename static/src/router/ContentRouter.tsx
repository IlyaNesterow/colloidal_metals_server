import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'


const ContentRouter: React.FC<React.PropsWithChildren<React.FC>> = ({ children }) => {
  type CreateRoutesFunc = () => JSX.Element[]

  const createRoutes: CreateRoutesFunc = () => 
    [
      'silver', 'gold', 
      'copper', 'platinum'
    ].map((elem, i) => (
      <Route
        exact
        key={ elem + i }
        path={ '/' + elem }
      />
    ))
  

  return(
    <BrowserRouter basename="/content">
      { children }
      <Switch>
        { createRoutes() }
        <Redirect 
          to="/view"
          from="*"
        />
      </Switch>
    </BrowserRouter>
  )
}

export default ContentRouter