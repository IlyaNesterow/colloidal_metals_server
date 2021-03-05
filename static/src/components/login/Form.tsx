import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { InputOnChange, SpanMouseEvent, DivOnClick } from '../../types/functions'
import { setError, login, setLoading } from '../../redux/actions'
import { login as loginInLS } from '../../helpers/localStorage'
import { server } from '../../utils/variables'

import PwField from '../global/PasswordField'
import Info from './Info'

import { useLoadingButton } from '../../helpers/hooks'


const LoadingButton: React.FC<any> = () => <div className="loader"></div>

const Form: React.FC<{ label: string }> = ({ label }) => {
  const dispatch = useDispatch()

  const history = useHistory()
 
  const [ username, setUsername ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ visibleInfo, setVisibleInfo ] = useState<boolean>(false)
  
  const pwOnChange: (val: string) => void = (val) => setPassword(val)

  const usernameOnChange: InputOnChange = (e) => setUsername(e.target.value)

  const handleSubmit: DivOnClick = (e) => {
    e.preventDefault()
    if(username.length < 4) return dispatch(setError('Username is to short'))
    if(password.length < 5) return dispatch(setError('Password does not seem to match'))
    dispatch(setLoading(true))

    interface ResponseJSON {
      error?: string
      token?: string
    } 

    fetch(`${ server }login`, {
      method: 'PUT',
      body: JSON.stringify({ username, password }),
      headers: {'content-type': 'application/json'}
    })
      .then(res => res.json()) 
      .then((res: ResponseJSON) => {
        if(res.error) return dispatch(setError(res.error))
        if(!res.token) throw Error('Token not found')

        dispatch(login({ username, session: res.token as string }))
        loginInLS(username, res.token as string)
        history.push('/')
      })
      .catch((err: Error) => dispatch(setError(err.message))) 
      .finally(() => dispatch(setLoading(false)))
  }

  const handleClick: SpanMouseEvent = () => {
    if(isMobile)
      setVisibleInfo(!visibleInfo)
  }

  const mouseEnterHandler: SpanMouseEvent = ()  => {
    if(!isMobile)
      setVisibleInfo(true)
  }

  const mouseLeaveHandler: SpanMouseEvent = ()  => {
    if(!isMobile)
      setVisibleInfo(false)
  }

  const [ button ] = useLoadingButton({ 
    component: LoadingButton, 
    label: label.toUpperCase(),
    onClick: handleSubmit,
    id: 'button' 
  })

  return(
    <form>
      <p className="no-select">
        Your Username
        <span 
          id="info"
          onClick={ handleClick }
          onMouseEnter={ mouseEnterHandler }
          onMouseLeave={ mouseLeaveHandler }
        >ⓘ</span>
      </p>
      <Info visible={ visibleInfo }/>
      <input 
        type="text"
        onChange={ usernameOnChange }
      />
      <p className="no-select">Password</p>
      <PwField
        onChange={ pwOnChange }
      /> 
      { button }
    </form>
  )
}

export default Form