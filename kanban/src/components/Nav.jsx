import React, { useState } from 'react';
import Button from './Button';
import LogoLight from '../assets/logo-light.svg';
import LogoDark from '../assets/logo-dark.svg';
import VerticalEllipsis from '../assets/icon-vertical-ellipsis.svg';
import PopUp from './PopUp';

function Nav({ boardName, theme }) {
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const handleButtonClick = () => {
    setPopUpOpen(true);
  };

  const closePopUp = () => {
    setPopUpOpen(false);
  };

  return (
    <>
      <nav className={theme}>
        <div className="content">
          <h2>{boardName}</h2>
          <div className="content-right">
            <Button type="btn-primary" content="+ Add New Task" func={handleButtonClick} />
            <img src={VerticalEllipsis} alt="Menu Vertical" onClick={handleButtonClick} />
          </div>
        </div>
      </nav>
      {isPopUpOpen && <PopUp type="AddNewTask" onClose={closePopUp} />}
    </>
  );
}

export default Nav;
