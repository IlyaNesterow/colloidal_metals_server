import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAppInfo } from '../redux/selectors'
import { setDefaultTheme, logout, login, setError } from '../redux/actions'
import Global from '../styles/global'
import { setDefaults } from '../helpers/localStorage'
import Router from '../router'
import ErrorMessage from './global/ErrorMessage'

 
const App: React.FC = () => {
  const { theme, error } = useSelector(getAppInfo)
  const [ emptyBox, setEmptyBox ] = useState<boolean>(true)

  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('storage', storageObserver)
    return () => {
      window.removeEventListener('storage', storageObserver)
    }
  })

  useEffect(() => {
    fetch('/auth/whoami')
      .then(res => res.json())
      .then(res => {
        if(res.username)
          dispatch(login({ username: res.username }))
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setEmptyBox(false))
  }, [ dispatch ])

  const storageObserver = (e: StorageEvent): void => {
    !e.key && _setDefaults()
  }

  const _setDefaults = (): void => {
    setDefaults()
    dispatch(setDefaultTheme(false))
    dispatch(logout())
  }

  return (
    <div>
      <Global darkTheme={ theme }/>
      { error && <ErrorMessage error={ error }/> }
      { !emptyBox && <Router/> }
    </div>
  )
}

export default App