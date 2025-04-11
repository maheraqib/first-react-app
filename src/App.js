import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import TextForm from './components/TextForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode')
    if (savedMode) {
      setMode(savedMode)
      document.body.style.backgroundColor = savedMode === 'dark' ? '#121212' : 'white'
      document.body.style.color = savedMode === 'dark' ? 'white' : 'black'
    }
  }, [])

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)

    // Apply background color to entire page
    document.body.style.backgroundColor = newMode === 'dark' ? '#121212' : 'white'
    document.body.style.color = newMode === 'dark' ? 'white' : 'black'
  }

  return (
    <>
      <Navbar title = "Text Converter"  mode={mode}
       toggleMode={toggleMode}/>

      <div className='container my-3' >
      <TextForm heading = "Enter the text below for analyze" mode={mode}/>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}

export default App;
