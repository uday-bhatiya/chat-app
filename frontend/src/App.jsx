import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignupPage, LoginPage, HomePage, ProfilePage, SettingsPage } from './pages';
import { useAuthStore } from './store/useAuthStore.js';
import { useThemeStore } from './store/useThemeStore.js';

import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log(authUser);

  if (isCheckingAuth && !authUser) return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#171212]'>
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <div data-theme={ theme }>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>

      <Toaster />

    </div>
  )
}

export default App