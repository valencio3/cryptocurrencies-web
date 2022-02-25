import { RouteObject } from 'react-router-dom'
import { Crypto } from '../pages/Crypto'
import { Home } from '../pages/Home'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/crypto/:id/:name/:currency',
    element: <Crypto />
  }
]