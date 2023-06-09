import React, { useState } from "react"
import Button from "./Button"
import LogoLight from "../assets/logo-light.svg"
import LogoDark from "../assets/logo-dark.svg"
import VerticalEllipsis from "../assets/icon-vertical-ellipsis.svg"
import PopUp from "./PopUp"

function Nav({ boardName, theme, data }) {
  const [isPopUpOpen, setPopUpOpen] = useState(false)
  const [delPopUp, setDelPopUp] = useState(false)

  const openPopUp = () => {
    setPopUpOpen(true)
  }

  const closePopUp = () => {
    setPopUpOpen(false)
  }

  const openDelPopUp = () => {
    setDelPopUp(true)
  }

  const closeDelPopUp = () => {
    setDelPopUp(false)
  }

  return (
    <>
      <nav className={theme}>
        <div className="content">
          <h2>{boardName}</h2>
          <div className="content-right">
            <Button
              type="btn-primary"
              content="+ Add New Task"
              func={openPopUp}
            />
            <img
              src={VerticalEllipsis}
              alt="Menu Vertical"
              onClick={openDelPopUp}
            />
          </div>
        </div>
      </nav>
      {isPopUpOpen && (
        <PopUp
          type="AddNewTask"
          onClose={closePopUp}
          data={data}
          selectBoard={boardName}
          theme={theme}
        />
      )}
      {delPopUp && (
        <PopUp
          type="DelBoard"
          onClose={closeDelPopUp}
          data={data}
          selectBoard={boardName}
          theme={theme}
        />
      )}
    </>
  )
}

export default Nav
