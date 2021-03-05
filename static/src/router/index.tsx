import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'

import { SpecificRoute } from './SpecificRoute'

import Navbar from '../components/global/navbar'
import Menu from '../components/global/menu/Menu'
import ErrorMessage from '../components/global/ErrorMessage'
import { getAuthInfo } from '../redux/selectors'

import LoginPage from '../components/login'


const Router: React.FC = () => {
  const { loggedIn } = useSelector(getAuthInfo)

  return(
    <BrowserRouter>
      <Navbar/>
      <Menu/>
      <ErrorMessage/>
      { !loggedIn && <Redirect to="/login"/> }
      <Switch>
        <SpecificRoute
          exact
          path="/login"
          component={ LoginPage }
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Router