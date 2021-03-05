import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'

import { SpecificRoute } from './SpecificRoute'

import Navbar from '../components/global/navbar'
import Menu from '../components/global/menu/Menu'
import ErrorMessage from '../components/global/ErrorMessage'
import { getAuthInfo } from '../redux/selectors'

import LoginPage from '../components/login'
import Images from '../components/images'
import Content from '../components/content'


const Router: React.FC = () => {
  //const { loggedIn } = useSelector(getAuthInfo)

  return(
    <BrowserRouter>
      <Navbar/>
      <Menu/>
      <ErrorMessage/>
      <Switch>
        <SpecificRoute
          exact
          path="/login"
          component={ LoginPage }
        />
        <SpecificRoute
          exact
          path="/images"
          component={ Images }
        />
        <SpecificRoute
          exact
          path="/content"
          component={ Content }
        />
      </Switch>
    </BrowserRouter>
  )
}
//{ !loggedIn && <Redirect to="/login"/> }
export default Router