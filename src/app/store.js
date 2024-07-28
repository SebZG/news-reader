import { configureStore } from '@reduxjs/toolkit';

import articlePreviewReducer from "../features/articlePreviews/articlePreviewsSlice.js";
import currentArticleReducer from "../features/currentArticle/currentArticleSlice.js";
import commentsReducer from "../features/comments/commentsSlice.js";

export default configureStore({
   reducer: {
      articlePreviews: articlePreviewReducer,
      currentArticle: currentArticleReducer,
      comments: commentsReducer
   },
});