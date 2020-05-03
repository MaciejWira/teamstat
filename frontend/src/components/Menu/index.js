import { Link } from 'react-router-dom';
import React from 'react';

import { viewsArr } from '../../views/helpers';
import Burger from '../Burger';


const Menu = ({ openedMenu, setOpenedMenu }) => {

  const links = viewsArr.map((link, index) => (
    <li
      key={index}
      className="c-menu__li">
      <Link
        onClick={() => setOpenedMenu(false)}
        className="c-menu__link"
        to={link.path}>{link.name}</Link>
    </li>
  ))

  return(
    <div
      className={"c-menu-wrapper" + ( openedMenu ? " c-menu-wrapper--show" : "" )}>
      <div className="c-menu-wrapper__container">
        <div className="c-menu-wrapper__main">
          <Burger
            text="Zamknij"
            isActive={openedMenu}
            clickHandler={() => setOpenedMenu(prev => !prev)}/>
          <ul className="c-menu">
            {links}
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Menu;
