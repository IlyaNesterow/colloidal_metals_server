import React, { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAppInfo } from '../../redux/selectors'
import { setError, setLoading } from '../../redux/actions'

import PwField from '../global/PasswordField'
import { CloseModalCtx } from '../../helpers/contexts'
import Form from '../../styles/form'


const NewPwForm: React.FC = () => {
  const { theme } = useSelector(getAppInfo)
  const close = useContext(CloseModalCtx)
  const dispatch = useDispatch()

  const [ pw, setPw ] = useState<string>('')
  const [ pw_repeat, setPwRepeat ] = useState<string>('')
  const [ new_pw, setNewPw ] = useState<string>('')

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    if(pw.length === 0 || pw_repeat.length === 0 || new_pw.length === 0) return dispatch(setError('Fill all fields'))
    if(pw !== pw_repeat) return dispatch(setError('Passwords should match'))
    if(pw.length < 5 || pw_repeat.length < 5 || new_pw.length < 5)  return dispatch(setError('Passwords too short'))
    dispatch(setLoading(true))

    fetch('/edit/password', {
      method: 'PUT',
      body: JSON.stringify({ pw, pw_repeat, new_pw }),
      headers: { 'content-type': 'application/json' }
    }) 
      .then(res => res.json())
      .then(res => {
        if(res.error) return dispatch(setError(res.error))
      })
      .catch((err: Error) => dispatch(setError(err.message || 'Error occured')))
      .finally(() => {
        dispatch(setLoading(false))
        close()
      })
  }

  return(
    <Form darkTheme={ theme }>
      <p>Your old password</p>
      <PwField onChange={(e) => setPw(e)}/>
      <p>Your old password again</p>
      <PwField onChange={(e) => setPwRepeat(e)}/>
      <p>Your new password</p>
      <PwField onChange={(e) => setNewPw(e)}/>
      <button
        onClick={ handleClick }
      >Submit</button>
    </Form>
  )
}

export default NewPwForm