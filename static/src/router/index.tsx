import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import { SpecificRoute } from './SpecificRoute'

import Navbar from '../components/global/navbar'
import Menu from '../components/global/menu/Menu'
import ErrorMessage from '../components/global/ErrorMessage'

import LoginPage from '../components/login'
import Images from '../components/images'
import Content from '../components/content'
import Credentials from '../components/credentials'


const Router: React.FC = () => (
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
        path="/pictures"
        privateRoute
        component={ Images }
      />
      <SpecificRoute
        exact
        path="/content"
        privateRoute
        component={ Content }
      />
      <SpecificRoute
        exact
        path="/credentials"
        privateRoute
        component={ Credentials }
      />
    </Switch>
  </BrowserRouter>
)

//{ !loggedIn && <Redirect to="/login"/> }
export default Router