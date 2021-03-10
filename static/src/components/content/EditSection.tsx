import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import Container from '../../styles/modifySection'
import { setLoading, setError } from '../../redux/actions'
import Intro from './Introduction'
import Information from './Info'
import Produced from './Production'
import SellersComponent from './Sellers'
import Other from './Other'

import * as Types from '../../types'
import { HandleEdit } from '../../types/functions'
import { content as url } from '../../utils/variables'
import { CloseModalCtx } from '../../helpers/contexts'

interface Props {
  page: Types.PageName
  section: Types.SectionName
}

const EditSection: React.FC<Props> = ({ page, section }) => {
  const [ content, setContent ] = useState<null | Types.Content>(null)

  const dispatch = useDispatch()

  const close = useContext(CloseModalCtx)

  useEffect(() => {
    dispatch(setLoading(true))
    fetch(url)
      .then(res => {
        if(!res.ok) throw new Error('AWS refused')
        return res.json()
      })
      .then((res: Types.Content) => {
        if(!res.pages) throw new Error('Content not found')
        setContent(res)
      })
      .catch((err: Error) => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)))
  }, [ dispatch ])

  const handleSubmit: HandleEdit<Types.SectionType> = useCallback((edited: Types.SectionType) => {
    if(content && edited){
      setContent({
        ...content,
        pages: {
          ...content.pages,
          [page]: {
            ...content.pages[page],
            [section]: edited
          }
        }
      })
      /*dispatch(setLoading(true))

      fetch('/edit/content', {
        method: 'PUT',
        body: JSON.stringify(content)
      })
        .then(res => res.json())
        .then(res => {
          if(res.error) throw new Error(res.error)
        })
        .catch((err: Error) => dispatch(setError(err.message)))
        .finally(() => {
          dispatch(setLoading(false))
          close()
        })*/
    }
  }, [ content, /*dispatch, close,*/ page, section ])

  type RenderForm = () => JSX.Element | undefined

  const renderForm: RenderForm = () => {
    if(content){
      const props = { page, handleSubmit }
      switch(section){
      
        case 'introduction':
          return (
            <Intro { ...props }
              content={ content.pages[page][section] }
            />
          )
        case 'information':
          return(
            <Information { ...props }
              content={ content.pages[page][section] }
            />  
          )
        case 'synthesys':
          return(
            <Produced { ...props }
              content={ content.pages[page][section] }
            />
          )
        case 'sellers':
          return(
            <SellersComponent { ...props }
              content={ content.pages[page][section] }
            />
          )
        case 'other':
          return(
            <Other { ...props }
              content={ content.pages[page][section] }
            />
          )
        default: 
          return <></>
      }
    }
  }

  return(
    <Container>
      { renderForm() }
    </Container>
  )
}

export default React.memo(EditSection)