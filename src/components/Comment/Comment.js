import { React, useState, useContext } from "react";
import axios from "axios";

import { MenuContext } from "../../App";

import "./comment.css";

function createMarkup(item) {
  return { __html: item };
}

const Comment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const { adItem } = useContext(MenuContext);

  useState(() => {
    axios(`https://api.hnpwa.com/v0/item/${adItem}.json`).then((res) => {
      setComments([...res.data.comments]);
      setIsLoading(false);
    });
  });

  return (
    <section className="comments">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="comments__title">
            {comments.length ? "Comments:" : "There is no comments"}
          </h1>
          <ul className="comments__list">
            {comments.map((item) => {
              return (
                <li
                  key={item.id}
                  className="comments__item"
                  dangerouslySetInnerHTML={createMarkup(item.content)}
                ></li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
};

export default Comment;
