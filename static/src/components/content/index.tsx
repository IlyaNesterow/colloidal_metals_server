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
import { PageName, SectionName } from '../../types'


const Main: React.FC<any> = () => {
  const [ currentPage, setCurrentPage ] = useState<undefined | PageName>(undefined)
  const [ currentSection, setCurrentSection ] = useState<undefined | SectionName>(undefined)
  const [ openModal, setOpenModal ] = useState<boolean>(false)

  const { theme } = useSelector(getAppInfo)

  const selectPage = useRef<HTMLSelectElement | null>(null)
  const selectPart = useRef<HTMLSelectElement | null>(null)

  const handleBtnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if(currentPage && currentSection) setOpenModal(true)
  }

  const cancelModifying: () => void = () => {
    if(selectPage.current && selectPart.current){
      selectPage.current.value = ''
      selectPart.current.value = ''
      setOpenModal(false)
      setCurrentPage(undefined)
      setCurrentSection(undefined)
    }
  }

  return(
    <>
      <Container darkTheme={ theme }>
        <h2>Modify content</h2>
        <h3>Choose Section</h3>
        <Select
          onChange={(e) => setCurrentPage(e.target.value as PageName)}
          ref={ selectPage }
          items={ sections }
        />
        <h3>Choose Part</h3>
        <Select
          onChange={(e) => setCurrentSection(e.target.value as SectionName)}
          ref={ selectPart }
          items={ parts }
        />
        <button 
          onClick={ handleBtnClick }
          disabled={ !currentPage && !currentSection }
        >MODIFY</button>
      </Container>
      { openModal && currentPage && currentSection &&
        <CloseModalCtx.Provider value={ cancelModifying }>
          <Modal>
            <EditSection 
              page={ currentPage }
              section={ currentSection }
            />
          </Modal>
        </CloseModalCtx.Provider>
      }
      <Loading/>
    </>
  )
}

export default Main