import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps as Props } from 'react-router-dom'

import { getAuthInfo } from '../redux/selectors'

interface RouteProps extends Props {
  component: any,
  redirectTo?: string,
  privateRoute?: boolean
}

export const SpecificRoute: React.FC<RouteProps> = ({ 
  component: Component, 
  redirectTo,
  privateRoute,
  ...rest 
}) => {
  const { loggedIn } = useSelector(getAuthInfo)

  if(privateRoute === undefined) privateRoute = false

  return (
    <Route
      render={(props) =>
        loggedIn === privateRoute 
          ? <Component {...props} /> 
          : <Redirect to={ redirectTo ? redirectTo : '/login' } />
      }
      {  ...rest }
    />
  )
}

