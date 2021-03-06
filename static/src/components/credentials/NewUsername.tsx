import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAppInfo, getAuthInfo } from '../../redux/selectors' 
import { setError, setLoading, login } from '../../redux/actions'

import Form from '../../styles/form'
import { CloseModalCtx } from '../../helpers/contexts'


const NewUsername: React.FC = () => {
  const { theme } = useSelector(getAppInfo)
  const { username } = useSelector(getAuthInfo)

  const dispatch = useDispatch()

  const close = useContext(CloseModalCtx)

  const [ currentUsername, setCurrentUsername ] = useState<string>('')
  const [ newUsername, setNewUsername ] = useState<string>('')

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if(currentUsername.length === 0 || newUsername.length === 0) return dispatch(setError('Fill all of the fields'))
    if(currentUsername.length < 4 || newUsername.length < 4) return dispatch(setError('Username must be at least 4 characters'))
    if(username !== currentUsername) return dispatch(setError('Wrong current username'))

    dispatch(setLoading(true))
    fetch('/edit/username', {
      method: 'PUT',
      body: JSON.stringify({
        username: newUsername,
        old_username: currentUsername
      }),
      headers: { 'content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if(res.error) return dispatch(setError(res.error))
        dispatch(login({ username: res.username }))
      })
      .catch((err: Error) => dispatch(setError(err.message || 'Error occured')))
      .finally(() => {
        dispatch(setLoading(false))
        close()
      })
  }

  return(
    <Form darkTheme={ theme }>
      <p>Your current username</p>
      <input type="text" onChange={(e) => setCurrentUsername(e.target.value)}/>
      <p>Your new username</p>
      <input type="text" onChange={(e) => setNewUsername(e.target.value)}/>
      <button
        onClick={ handleClick }
      >Submit</button>
    </Form>
  )
}

export default NewUsername