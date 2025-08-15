import PrivateRoute from '@/components/privateRoute'
import React from 'react'
import Home from './Home'


const page = () => {
  return (
    <PrivateRoute>
      <Home/>
    </PrivateRoute>
  )
}

export default page

