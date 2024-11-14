"use client"
import { Spinner } from '@nextui-org/react'
import React from 'react'

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen"><Spinner color="danger"/></div>
  )
}

export default loading