import * as api from './restAPI';
import * as common from './commons';

/**
 * @description Get all Categories and posts
 * @return A Promise with fetched categories and posts
 */
export function getInitialData() {
  return Promise.all([
      api.getAllCategories(),
      api.getAllPosts()
    ]).then(([categories, posts]) => ({
      categories,
      posts,
    })
  );
}

/**
 * @description Get all Comments from an array of Posts
 * @param posts A post array with valid ids
 * @return A Promise with all fetched comments chained from posts argument ids
 */
export function getAllComments(posts) {
  if (common.isEmpty(posts)) {
    return new Promise();
  }
  //create Promises for each Post id to get its comments
  const tasks = posts.map(post => api.getAllCommentsFromPost(post.id));
  return tasks
    .reduce((promiseChain, currentTask) => {
      return promiseChain.then(chainResults =>
        //chain the WS operation results
        currentTask.then(currentResult => [...chainResults, currentResult])
      );
    }, Promise.resolve([]))
    .then(arrayOfResults => {
      //after resolving them, create a unique array to return all comments
      let comments = [];
      for (let arrComment of arrayOfResults) {
        if (!common.isEmpty(arrComment)) {
          comments = comments.concat(arrComment);
        }
      }
      return new Promise((res, rej) => res(comments));
    });
}

/**
 * @description Change the vote score of a Post
 * @param vote object {id, option} with Post id and {@code constants#VOTE_OPTIONS} constant.
 * @return A new Promise with the new Post object returned from REST
 */
export function placePostVote(vote) {
  return api.placePostVote(vote)
}

/**
 * @description Add a new Post object
 * @param post a complete Post object with all its fields filled.
 * @return A new Promise with the new added Post object returned from REST
 */
export function addNewPost(post) {
  return api.addNewPost(post);
}

/**
 * @description Update an existing Post object
 * @param post an object with fields {id, category, title, author, body, deleted} from the Post.
 * @return A new Promise with the updated Post object returned from REST
 */
export function updatePost(post) {
  return api.updatePost(post)
}

/**
 * @description Remove an existing Post object
 * @param postId the identification of the Post to be deleted
 * @return A new Promise with the deleted Post object returned from REST
 */
export function deletePost(postId) {
  return api.deletePost(postId)
}

/**
 * @description Fetch all Comments of one Post
 * @param postId the identification of the Post to get its Comments
 * @return A new Promise with the Post's array of Comments objects returned from REST
 */
export function loadCommentsFromPost(postId) {
  return api.getAllCommentsFromPost(postId);
}

/**
 * @description Change the vote score of a Comment
 * @param vote object {id, option} with Comment id and {@code constants#VOTE_OPTIONS} constant.
 * @return A new Promise with the new Comment object returned from REST
 */
export function placeCommentVote(vote) {
  return api.placeCommentVote(vote);
}

/**
 * @description Remove an existing Comment object
 * @param commentId the identification of the Comment to be deleted
 * @return A new Promise with the deleted Comment object returned from REST
 */
export function deleteComment(commentId) {
  return api.deleteComment(commentId);
}

/**
 * @description Add a new Comment object
 * @param comment a complete Comment object with all its fields filled.
 * @return A new Promise with the new added Comment object returned from REST
 */
export function addNewComment(comment) {
  return api.addNewComment(comment);
}

/**
 * @description Update an existing Comment object
 * @param comment an object with fields {id, timestamp, body, author, deleted, parendDeleted} from the Comment.
 * @return A new Promise with the updated Comment object returned from REST
 */
export function updateComment(comment) {
  return api.updateComment(comment);
}