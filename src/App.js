import { createContext, useState, useRef } from "react";

import Menu from "./components/Menu/Menu";
import Ads from "./components/Ad/Ads";
import Comment from "./components/Comment/Comment";
import ErrorMsg from "./components/ErrorMsg/ErrorMsg";

import "./styles/nullstyles.css";
import "./App.css";

export const MenuContext = createContext();

function App() {
  const [selectedMenu, setSelectedMenu] = useState("news");
  const [itemId, setItemId] = useState(null);
  const [isError, setIsError] = useState(false);
  const errorMsg = useRef();

  return (
    <div className="App">
      <MenuContext.Provider
        value={{
          selectedMenu,
          setSelectedMenu,
          itemId,
          setItemId,
          isError,
          setIsError,
          errorMsg,
        }}
      >
        <Menu />
        <div className="container">
          {selectedMenu && <Ads />}
          {itemId && <Comment />}
          <ErrorMsg />
        </div>
      </MenuContext.Provider>
    </div>
  );
}

export default App;
