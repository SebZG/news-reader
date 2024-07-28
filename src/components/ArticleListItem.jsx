const ArticleListItem = ({ article }) => {

   return (
      <button key={article.id} className="article-container">
         <img className="article-image" src={article.image} alt="" />
         <div className="article-content-container">
            <h3 className="article-title">{article.title}</h3>
            <p className="article-preview">{article.preview}</p>
         </div>
      </button>
   )
}

export default ArticleListItem;