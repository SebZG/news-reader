import Comment from "./Comment.jsx";

const CommentList = ({ comments }) => {
   if (comments) {
      return (
         <ul className="comments-list">
            {comments.map((comment) => (
               <Comment comment={comment} />
            ))}
         </ul>
      )
   }

}
export default CommentList;