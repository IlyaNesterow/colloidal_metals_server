import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getAuthInfo } from '../../redux/selectors'
import { logout, setError } from '../../redux/actions'


const AuthCtx: React.FC = () => {
  const { loggedIn } = useSelector(getAuthInfo)

  const dispatch = useDispatch()

  const history = useHistory()
  
  const _handleLogout = (): void => {
    dispatch(logout())
    fetch('/auth/logout')
      .then(res => res.json())
      .then(res => {
        if(!res.logout) throw new Error('Logout failed')
        history.push('/login')
      })
      .catch((err: Error) => dispatch(setError(err.message || 'Logout failed')))
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