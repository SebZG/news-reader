import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   loadAllPreviews,
   selectAllPreviews,
   isLoading
} from "./articlePreviewsSlice.js";
import { loadCurrentArticle } from "../currentArticle/currentArticleSlice.js";
import ArticleListItem from "../../components/ArticleListItem";

const ArticlePreviews = () => {
   const dispatch = useDispatch();
   const articlePreviews = useSelector(selectAllPreviews);
   const isLoadingPreviews = useSelector(isLoading);

   useEffect(() => {
      dispatch(loadAllPreviews());
   }, [dispatch]);

   if (isLoadingPreviews) {
      return <div>Loading state</div>;
   }

   return (
      <section className="articles-container">
         <h2 className="section-title">All Articles</h2>
         {articlePreviews.map((article) => (
            <div
               key={article.id}
               onClick={(e) => dispatch(loadCurrentArticle(article.id))}
            >
               <ArticleListItem article={article} />
            </div>
         ))}
      </section>
   )
}
export default ArticlePreviews;