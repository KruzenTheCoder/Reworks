'use client'

import { useState, useEffect } from 'react'
import Preloader from './Preloader'

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && (
        <div className="transition-opacity duration-500 opacity-100">
          {children}
        </div>
      )}
    </>
  )
}
