import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getAuthInfo } from '../../redux/selectors'
import { logout } from '../../redux/actions'
import { handleLogout } from '../../helpers/localStorage'


const AuthCtx: React.FC = () => {
  const { loggedIn } = useSelector(getAuthInfo)

  const dispatch = useDispatch()

  const history = useHistory()

  const _handleLogout = (): void => {
    dispatch(logout())
    handleLogout()
    history.push('/login')
  }

  return loggedIn
    ? <div
        className="menu-link"
        onClick={ _handleLogout }
        id="auth-ctx"
      >
        LOG OUT
      </div>
    : null
}

export default AuthCtx