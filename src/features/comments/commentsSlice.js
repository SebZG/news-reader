// Import createAsyncThunk and createSlice here.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
   "comments/loadCommentsForArticleId",
   async (articleId) => {
      const data = await fetch(`api/articles/${articleId}/comments`);
      const json = await data.json();
      return json;
   }
);

// Create postCommentForArticleId here.
export const postCommentForArticleId = createAsyncThunk(
   "comments/postCommentForArticleId",
   async ({ articleId, comment }) => {
      const requestBody = JSON.stringify({
         comment: comment,
      });
      const data = await fetch(`api/articles/${articleId}/comments`, {
         method: "POST",
         body: requestBody,
      });
      const json = await data.json();
      return json;
   }
);

export const commentsSlice = createSlice({
   name: "comments",
   initialState: {
      // Add initial state properties here.
      byArticleId: {},
      isLoadingComments: false,
      failedToLoadComments: false,
      createCommentIsPending: false,
      failedToCreateComment: false,
   },
   // Add extraReducers here.
   extraReducers: (builder) => {
      builder
         .addCase(loadCommentsForArticleId.pending, (state) => {
            state.isLoadingComments = true;
            state.failedToLoadComments = false;
         })
         .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = false;
            const { articleId, comments } = action.payload;
            state.byArticleId[articleId] = comments;
         })
         .addCase(loadCommentsForArticleId.rejected, (state) => {
            state.isLoadingComments = false;
            state.failedToLoadComments = true;
         })
         .addCase(postCommentForArticleId.pending, (state) => {
            state.createCommentIsPending = true;
            state.failedToCreateComment = false;
         })
         .addCase(postCommentForArticleId.fulfilled, (state, action) => {
            state.createCommentIsPending = false;
            state.failedToCreateComment = false;
            const { articleId } = action.payload;
            state.byArticleId[articleId].push(action.payload);
         })
         .addCase(postCommentForArticleId.rejected, (state) => {
            state.createCommentIsPending = false;
            state.failedToCreateComment = true;
         });
   },
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) =>
   state.comments.createCommentIsPending;

export default commentsSlice.reducer;
