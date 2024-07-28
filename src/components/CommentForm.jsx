import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
   createCommentIsPending,
   postCommentForArticleId
} from "../features/comments/commentsSlice.js";

const CommentForm = ({ articleId }) => {
   const [comment, setComment] = useState("");
   const dispatch = useDispatch();
   const createPending = useSelector(createCommentIsPending);

   const handleSubmit = (e) => {
      e.preventDefault();

      dispatch(
         postCommentForArticleId({
            articleId: articleId,
            comment: comment
         })
      );
      setComment("");
   }

   return (
      <form onSubmit={handleSubmit}>
         <label className="label" for="comment">
            Add Comment:
         </label>
         <div id="input-container">
            <input
               id="comment"
               value={comment}
               onChange={(e) => setComment(e.currentTarget.value)}
               type="text"
            />
            <button className="comment-button" disabled={createPending}>
               Submit
            </button>
         </div>
      </form>
   )
}
export default CommentForm;