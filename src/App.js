import { createContext, useState } from "react";

import Menu from "./components/Menu/Menu";
import Ads from "./components/Ad/Ads";
import Comment from "./components/Comment/Comment";

import "./styles/nullstyles.css";
import "./App.css";

export const MenuContext = createContext();

function App() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [adItem, setAdItem] = useState(null);

  return (
    <div className="App">
      <MenuContext.Provider
        value={{ selectedMenu, setSelectedMenu, adItem, setAdItem }}
      >
        <Menu />
        <div className="container">
          {selectedMenu ? <Ads /> : ""}
          {adItem ? <Comment /> : ""}
        </div>
      </MenuContext.Provider>
    </div>
  );
}

export default App;
