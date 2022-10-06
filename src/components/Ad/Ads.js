import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import { MenuContext } from "../../App";

import "./ads.css";

const Ads = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { selectedMenu, setSelectedMenu, setAdItem } = useContext(MenuContext);
  const tbody = useRef();

  useEffect(() => {
    const url = `https://api.hnpwa.com/v0/${selectedMenu}/1.json`;
    axios.get(url).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, [selectedMenu]);

  const sortHandler = (name) => (e) => {
    const dataSorted = data.sort((a, b) => {
      const firstElem = a[name];
      const secondElem = b[name];
      if (firstElem > secondElem) return 1;
      if (secondElem > firstElem) return -1;
      return 0;
    });
    setData([...dataSorted]);
  };

  const showCommentsHandler = async (e) => {
    const elem = e.target.closest("tr");

    const elemId = elem.getAttribute("id");

    setSelectedMenu(null);
    setAdItem(elemId);
  };

  return (
    <section className="ads">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-ads">
          <thead className="table-ads__head">
            <tr>
              <th onClick={sortHandler("time")}>Time</th>
              <th onClick={sortHandler("title")}>Title</th>
              <th onClick={sortHandler("domain")}>Domain</th>
            </tr>
          </thead>
          <tbody ref={tbody} className="table-ads__body">
            {data.map((item) => {
              const date = new Date(item.time).toDateString();
              return (
                <tr key={item.id} id={item.id} onClick={showCommentsHandler}>
                  <td data-date={item?.time}>{date}</td>
                  <td>{item.title}</td>
                  <td>{item.domain}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Ads;
