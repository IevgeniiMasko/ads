import React from "react";

function createMarkup(item) {
  return { __html: item };
}

const CommentRecur = ({ comments }) => {
  return (
    <ul className="comments__list">
      {comments.map((item) => {
        return (
          <li key={item.id} className="comments__item">
            <p className="comments__author">
              <span className="comments__user">{item.user}</span>
              <span className="comments__time-ago"> - {item.time_ago}</span>
            </p>
            <p
              className="comments__content"
              dangerouslySetInnerHTML={createMarkup(item.content)}
            ></p>
            {item.comments.length === 0 ? (
              ""
            ) : (
              <>
                <p className="comments__reply">Replies:</p>
                <CommentRecur comments={item.comments} />
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentRecur;
