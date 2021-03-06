import React, { useState } from 'react'
import { CloseModalCtx } from '../../helpers/contexts'

import Container from '../../styles/credentials'
import Modal from '../modal'
import NewPassword from './NewPassword'
import NewUsername from './NewUsername'
import LoadingScene from '../global/LoadingScene'


const Main: React.FC = () => {
  const [ editingUsername, setEditingUsername ] = useState<boolean>(false)
  const [ editingPassword, setEditingPassword ] = useState<boolean>(false)

  return(
    <>
      <Container>
        <div onClick={() => setEditingPassword(true)}>
          <h2>Set new password</h2>
        </div>
        <div onClick={() => setEditingUsername(true)}>
          <h2>Set new username</h2>
        </div>
      </Container>
      {editingUsername &&
        <CloseModalCtx.Provider value={() => setEditingUsername(false)}>
          <Modal>
            <NewUsername/>
          </Modal>
        </CloseModalCtx.Provider>
      }
      {editingPassword &&
        <CloseModalCtx.Provider value={() => setEditingPassword(false)}>
          <Modal>
            <NewPassword/>
          </Modal>
        </CloseModalCtx.Provider>
      }
      <LoadingScene/>
    </>
  )
}

export default Main