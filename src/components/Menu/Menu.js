import { React, useContext } from "react";

import { MenuContext } from "../../App";

import "./menu.css";

const Menu = () => {
  const { selectedMenu, setSelectedMenu, setItemId } = useContext(MenuContext);

  const clickMenuHandler = (e) => {
    const linkName = e.target.closest("li").dataset.name;
    setSelectedMenu(linkName);
    setItemId(null);
  };

  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__item" data-name="news">
          <button
            type="button"
            className={`menu__link ${
              selectedMenu === "news" ? "menu__link_clicked" : ""
            }`}
            onClick={clickMenuHandler}
          >
            News
          </button>
        </li>
        <li className="menu__item" data-name="show" onClick={clickMenuHandler}>
          <button
            type="button"
            className={`menu__link ${
              selectedMenu === "show" ? "menu__link_clicked" : ""
            }`}
          >
            Shows
          </button>
        </li>
        <li className="menu__item" data-name="jobs" onClick={clickMenuHandler}>
          <button
            type="button"
            className={`menu__link ${
              selectedMenu === "jobs" ? "menu__link_clicked" : ""
            }`}
          >
            Jobs
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
