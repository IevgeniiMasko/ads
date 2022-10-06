import { React, useContext } from "react";

import { MenuContext } from "../../App";

import "./menu.css";

const Menu = () => {
  const { selectedMenu, setSelectedMenu, setAdItem } = useContext(MenuContext);

  const clickMenuHandler = (e) => {
    const linkName = e.target.closest("li").dataset.name;
    setSelectedMenu(linkName);
    setAdItem(null);
  };

  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__item" data-name="news">
          <a
            href="#"
            className={`menu__link ${
              selectedMenu === "news" ? "menu__link_clicked" : ""
            }`}
            onClick={clickMenuHandler}
          >
            News
          </a>
        </li>
        <li className="menu__item" data-name="show" onClick={clickMenuHandler}>
          <a
            href="#"
            className={`menu__link ${
              selectedMenu === "show" ? "menu__link_clicked" : ""
            }`}
          >
            Shows
          </a>
        </li>
        <li className="menu__item" data-name="jobs" onClick={clickMenuHandler}>
          <a
            href="#"
            className={`menu__link ${
              selectedMenu === "jobs" ? "menu__link_clicked" : ""
            }`}
          >
            Jobs
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
