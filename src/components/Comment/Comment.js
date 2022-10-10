import { React, useState, useEffect, useContext } from "react";
import axios from "axios";

import { MenuContext } from "../../App";
import CommentRecur from "../CommentRec";

import "./comment.css";

const Comment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const { itemId, setIsError, errorMsg } = useContext(MenuContext);

  useEffect(() => {
    if (!itemId) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      axios(`https://api.hnpwa.com/v0/item/${itemId}.json`)
        .then((res) => {
          setComments([...res.data.comments]);
        })
        .catch((err) => {
          setComments([]);
          setIsError(true);
          errorMsg.current = err.message;
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [itemId]);

  return (
    <section className="comments">
      {isLoading ? (
        <div className="comments__loading">Loading...</div>
      ) : !comments.length ? (
        <p className="comments__nodata">No data available</p>
      ) : (
        <>
          <h1 className="comments__title">Comments:</h1>
          <CommentRecur comments={comments} />
        </>
      )}
    </section>
  );
};

export default Comment;
