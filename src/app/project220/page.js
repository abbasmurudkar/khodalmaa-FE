import React from 'react'
import WebSocketTable from './Machine'
import Nav from '@/components/ui/Nav'
import PrivateRoute from '@/components/privateRoute'

const page = () => {
  return (
    <PrivateRoute>
      <Nav/>
      <WebSocketTable/>
    </PrivateRoute>
  )
}

export default page
