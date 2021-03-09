import React, { useEffect, useState, useContext, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Container from '../../styles/modifySection'
import { setLoading, setError } from '../../redux/actions'
import Intro from './Introduction'
import Information from './Info'
import Produced from './Production'
import SellersComponent from './Sellers'
import Other from './Other'

import { Content, Page, Introduction, Info, Sellers } from '../../types'
import { HandleEdit } from '../../types/functions'
import { content as url, sections } from '../../utils/variables'
import { CloseModalCtx } from '../../helpers/contexts'

interface Props {
  section: string
  part: string
}

const EditSection: React.FC<Props> = ({ section, part }) => {
  const [ content, setContent ] = useState<null | Content>(null)

  const dispatch = useDispatch()

  const close = useContext(CloseModalCtx)

  useEffect(() => {
    dispatch(setLoading(true))
    fetch(url)
      .then(res => {
        if(!res.ok) throw new Error('AWS refused')
        return res.json()
      })
      .then((res: Content) => {
        if(!res.pages) throw new Error('Content not found')
        setContent(res)
      })
      .catch((err: Error) => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)))
  }, [ dispatch ])

  type GetPage = (stuff: Content) => Page | undefined
  type SetPage = (stuff: Content, page: Page) => void

  const getPage: GetPage = (obj) => {
    switch(section){
      case 'silver': 
        return obj.pages.silver
      case 'gold':
        return obj.pages.gold
      case 'platinum':
        return obj.pages.platinum
      case 'copper':
        return obj.pages.copper
    }
  } 

  const setPage: SetPage = (obj, page) => {
    switch(section){
      case 'silver': 
        obj.pages.silver = page
        break
      case 'gold':
        obj.pages.gold = page
        break
      case 'platinum':
        obj.pages.platinum = page
        break
      case 'copper':
        obj.pages.copper = page
        break
    }
  } 

  const _setPage = useRef(setPage)
  const _getPage = useRef(getPage)

  const handleSubmit: HandleEdit = useCallback((edited) => {
    if(content){
      const newContent = content
      _setPage.current(newContent, edited)
      setContent(newContent)
      dispatch(setLoading(true))

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
        })
    }
  }, [ content, dispatch, close ])

  type RenderForm = () => JSX.Element | undefined

  const renderForm: RenderForm = () => {
    if(content && sections.some(s => s === section))
      switch(part){
        case 'introduction':
          return (
            <Intro 
              content={ _getPage.current(content)?.introduction as Introduction }
              section={ section }
            />
          )
        case 'information':
          return(
            <Information 
              content={ _getPage.current(content)?.info as Info }
              section={ section }
            />  
          )
        case 'synthesys':
          return(
            <Produced
              content={ _getPage.current(content)?.howProduced }
              section={ section }
            />
          )
        case 'sellers':
          return(
            <SellersComponent
              content={ _getPage.current(content)?.sellers as Sellers }
              section={ section }
            />
          )
        case 'other':
          return(
            <Other
              content={ _getPage.current(content)?.otherSources }
              section={ section }
            />
          )
        default: 
          return <></>
      }
  }

  return(
    <Container>
      { renderForm() }
    </Container>
  )
}

export default React.memo(EditSection)