import React, { useState, useEffect } from 'react'
import LogoLight from '../assets/logo-light.svg'
import LogoDark from '../assets/logo-dark.svg'
import IconBoard from '../assets/icon-board.svg'
import IconBoardWhite from '../assets/icon-board-white.svg'
import IconBoardPurple from '../assets/icon-board-purple.svg'
import LightTheme from '../assets/icon-light-theme.svg'
import DarkTheme from '../assets/icon-dark-theme.svg'
import HideSidebar from '../assets/icon-hide-sidebar.svg'

function Aside({ boards, handleToggleMainClass, handleToggleTheme, theme, onBoardClick }) {
  const [activeItemIndex, setActiveItemIndex] = useState(null)
  const [isActive, setIsActive] = useState(theme === 'dark')

  useEffect(() => {
    const lastSelectedBoard = localStorage.getItem('lastSelectedBoard')
    setActiveItemIndex(lastSelectedBoard !== null ? Number(lastSelectedBoard) : 0)
  }, [])

  const handleClick = (index) => {
    setActiveItemIndex(index)
    onBoardClick(boards[index])
    localStorage.setItem('lastSelectedBoard', index)
  }

  useEffect(() => {
    setIsActive(theme === 'dark')
  }, [theme])

  const handleSlideClick = () => {
    setIsActive(!isActive)
    handleToggleTheme()
  }

  return (
    <aside>
      <div className="logo">
        {theme === 'light' ? (
          <img src={LogoDark} alt="Logo Light" />
        ) : (
          <img src={LogoLight} alt="Logo Dark" />
        )}
      </div>
      <div className="aside-content">
        <div className="aside-content__top">
          <h3>ALL BOARDS ({boards.length})</h3>
          <ul>
            {boards.map((board, index) => (
              <li
                key={board.id}
                className={activeItemIndex === index ? 'li-active' : ''}
                onClick={() => handleClick(index)}
              >
                {activeItemIndex === index ? (
                  <img src={IconBoardWhite} alt="IconBoardWhite" />
                ) : (
                  <img src={IconBoard} alt="IconBoard" />
                )}
                <p>{board.name}</p>
              </li>
            ))}
            <li>
              <img src={IconBoardPurple} alt="IconBoardPurple" />
              <p>+ Create New Board</p>
            </li>
          </ul>
        </div>
        <div className="aside-content__bottom">
          <div className="slide">
            <img src={LightTheme} alt="LightTheme" />
            <div
              className={`slide-button ${isActive ? 'active' : ''}`}
              onClick={handleSlideClick}
            >
              <div className="slide-button-circle"></div>
            </div>
            <img src={DarkTheme} alt="DarkTheme" />
          </div>
          <div className="hide" onClick={handleToggleMainClass}>
            <img src={HideSidebar} alt="HideSidebar" />
            <p>Hide Sidebar</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Aside
