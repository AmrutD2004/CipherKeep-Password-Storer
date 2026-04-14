import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Auth from './pages/Auth'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import NotFound404 from './pages/NotFound404'
import Protected from './components/Protected/Protected'
import Vault from './pages/Vault'
import Setting from './pages/Setting'
import { PasswordContextProvider } from './context/passwordContext'

const App = () => {
  return (
    <div className='selection:bg-neutral-800 selection:text-white'>
      <Toaster position="top-right"
      />
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/dashboard' element={<PasswordContextProvider>
            <Protected><Dashboard /></Protected>
          </PasswordContextProvider>} />
          <Route path='/vault' element={<PasswordContextProvider><Protected><Vault /></Protected></PasswordContextProvider>} />
          <Route path='/setting' element={<Protected><Setting /></Protected>} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App