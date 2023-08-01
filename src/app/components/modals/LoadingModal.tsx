'use client'

import Modal from './Modal'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const LoadingModal = () => {
  return (
    <Modal show={true} onCancel={() => {}} background="transparent">
      <div className="flex items-center justify-center">
        <AiOutlineLoading3Quarters
          className="animate-spin"
          color="#fff"
          size="3em"
        />
      </div>
    </Modal>
  )
}

export default LoadingModal
