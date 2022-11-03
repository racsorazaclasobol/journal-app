import { Route, Routes } from 'react-router-dom'

import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {

  const { status } = useCheckAuth(); 
  
  if( status === 'checking' ){
    return ( <CheckingAuth /> )
  }


  return (
    <Routes>

      {
        ( status === 'authenticated' )
        ? <Route path='/auth/*' element={ <AuthRoutes /> } />
        : <Route path='/*' element={ <JournalRoutes /> } />

      }

        {/* //Login y registro */}
        {/* <Route path='/auth/*' element={ <AuthRoutes /> } /> */}

        {/* //JournalAll */}
        {/* <Route path='/*' element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}
