import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import { MenuContext } from "../../App";

import { timeAgoToDate } from "../../utils/timeAgoToDate";

import "./ads.css";

const Ads = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sortingField, setSortingField] = useState(null);
  const [sortingOrder, setSortingOrder] = useState("asc");
  const { selectedMenu, setSelectedMenu, setItemId, setIsError, errorMsg } =
    useContext(MenuContext);
  const tbody = useRef();

  useEffect(() => {
    setIsLoading(true);
    const url = `https://api.hnpwa.com/v0/${selectedMenu}/1.json`;
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setData([]);
        setIsError(true);
        errorMsg.current = err.message;
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      })
      .finally(() => setIsLoading(false));
    setSortingField(null);
    // eslint-disable-next-line
  }, [selectedMenu]);

  const sortHandler = (name) => (e) => {
    const sign = sortingField !== name ? 1 : sortingOrder === "asc" ? -1 : 1;
    const order =
      sortingField !== name ? "asc" : sortingOrder === "asc" ? "desc" : "asc";

    const dataSorted = data.sort((a, b) => {
      const firstElem =
        name === "time" ? timeAgoToDate(a.time_ago) : a[name] || "";
      const secondElem =
        name === "time" ? timeAgoToDate(b.time_ago) : b[name] || "";
      if (firstElem > secondElem) return sign;
      if (secondElem > firstElem) return -1 * sign;
      return 0;
    });

    setSortingField(name);
    setSortingOrder(order);
    setData([...dataSorted]);
  };

  const showCommentsHandler = (itemId) => (e) => {
    setSelectedMenu(null);
    setItemId(itemId);
  };

  const activeSortingArrow = (field, order) => {
    if (sortingField === field && sortingOrder === order) {
      return "table-ads__sorting_active";
    } else {
      return null;
    }
  };

  return (
    <section className="ads">
      {isLoading ? (
        <p className="ads__loading">Loading...</p>
      ) : !data.length ? (
        <p className="ads__nodata">No data available</p>
      ) : (
        <table className="table-ads">
          <thead className="table-ads__head">
            <tr>
              <th onClick={sortHandler("time")}>
                Time
                <div className="table-ads__sorting-arrows">
                  <div className={activeSortingArrow("time", "desc")}>↑</div>
                  <div className={activeSortingArrow("time", "asc")}>↓</div>
                </div>
              </th>
              <th onClick={sortHandler("title")}>
                Title
                <div className="table-ads__sorting-arrows">
                  <div className={activeSortingArrow("title", "desc")}>↑</div>
                  <div className={activeSortingArrow("title", "asc")}>↓</div>
                </div>
              </th>
              <th onClick={sortHandler("domain")}>
                Domain
                <div className="table-ads__sorting-arrows">
                  <div className={activeSortingArrow("domain", "desc")}>↑</div>
                  <div className={activeSortingArrow("domain", "asc")}>↓</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody ref={tbody} className="table-ads__body">
            {data.map((item) => {
              const date = timeAgoToDate(item.time_ago);
              const dateStr = date instanceof Date ? date.toDateString() : date;
              console.log(item);
              return (
                <tr key={item.id} onClick={showCommentsHandler(item.id)}>
                  <td data-date={date}>{dateStr}</td>
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
