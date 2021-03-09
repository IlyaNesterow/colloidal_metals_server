import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { getAppInfo } from '../../redux/selectors'
import Container from '../../styles/content'
import Modal from '../modal'
import Loading from '../global/LoadingScene'
import EditSection from './EditSection'
import Select from './Select'

import { sections, parts } from '../../utils/variables'
import { CloseModalCtx } from '../../helpers/contexts'


const Main: React.FC<any> = () => {
  const [ currentOption, setCurrentOption ] = useState<string>('')
  const [ part, setPart ] = useState<string>('')
  const [ openModal, setOpenModal ] = useState<boolean>(false)

  const { theme } = useSelector(getAppInfo)

  const selectPage = useRef<HTMLSelectElement | null>(null)
  const selectPart = useRef<HTMLSelectElement | null>(null)

  const handleBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if(sections.some(s => s.toLowerCase() === currentOption)) setOpenModal(true)
  }

  const cancelModifying: () => void = () => {
    if(selectPage.current && selectPart.current){
      selectPage.current.value = ''
      selectPart.current.value = ''
      setOpenModal(false)
      setCurrentOption('')
    }
  }

  return(
    <>
      <Container darkTheme={ theme }>
        <h2>Modify content</h2>
        <h3>Choose Section</h3>
        <Select
          onChange={(e) => setCurrentOption(e.target.value)}
          ref={ selectPage }
          items={ sections }
        />
        <h3>Choose Part</h3>
        <Select
          onChange={(e) => setPart(e.target.value)}
          ref={ selectPart }
          items={ parts }
        />
        <button 
          onClick={ handleBtnClick }
          disabled={ !sections.some(s => s.toLowerCase() === currentOption) }
        >MODIFY</button>
      </Container>
      { openModal &&
        <CloseModalCtx.Provider value={ cancelModifying }>
          <Modal>
            <EditSection 
              section={ currentOption }
              part={ part }
            />
          </Modal>
        </CloseModalCtx.Provider>
      }
      <Loading/>
    </>
  )
}

export default Main