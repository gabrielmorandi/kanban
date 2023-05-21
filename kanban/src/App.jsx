import React, { useState, useEffect } from 'react'
import { getData } from './connections/getData'
import Button from './components/Button'
import Aside from './components/Aside'
import Nav from './components/Nav'
import BoardDetails from './components/BoardDetails'
import './css/app.css'
import ShowSidebar from './assets/icon-show-sidebar.svg'

function App() {
  const [data, setData] = useState(null)
  const [mainClass, setMainClass] = useState('open')
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [selectedBoard, setSelectedBoard] = useState(null) 
  const toggleTheme = () => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(updatedTheme)
    localStorage.setItem('theme', updatedTheme)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData()
        setData(result)
        
        const lastSelectedBoardIndex = localStorage.getItem('lastSelectedBoard')
        if (lastSelectedBoardIndex && result.boards[lastSelectedBoardIndex]) {
          setSelectedBoard(result.boards[lastSelectedBoardIndex])
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])



  const handleToggleMainClass = () => {
    setMainClass((prevClass) => (prevClass === 'open' ? 'close' : 'open'))
  }

  const handleBoardClick = (board) => {
    setSelectedBoard(board)
    localStorage.setItem('lastSelectedBoard', board.id)
  }

  return (
    <>
      <main className={`${mainClass} ${theme}`}>
        <Aside
          open="true"
          boards={data ? data.boards : []}
          handleToggleMainClass={handleToggleMainClass}
          handleToggleTheme={toggleTheme}
          theme={theme}
          onBoardClick={handleBoardClick}
        />
        <Nav boardName={selectedBoard ? selectedBoard.name : ''} theme={theme} data={data ? data.boards : []} />
        <div className="main">
          <BoardDetails board={selectedBoard} />
        </div>
        {mainClass === 'close' && (
          <div className="show" onClick={handleToggleMainClass}>
            <img src={ShowSidebar} alt="ShowSidebar" />
          </div>
        )}
      </main>
    </>
  )
}

export default App
