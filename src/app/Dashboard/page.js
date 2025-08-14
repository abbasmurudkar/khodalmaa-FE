import PrivateRoute from '@/components/privateRoute'
import React from 'react'

const Home = () => {
  return (
    <PrivateRoute>
      hello world
    </PrivateRoute>
  )
}

export default Home
