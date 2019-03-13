const api = 'http://localhost:3001';

// Generate a unique token for storing posts and comments data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = 'Bearer '.concat(
    Math.random()
      .toString(36)
      .substr(-8)
  );

const headers = {
  Accept: 'application/json',
  Authorization: token
};

/**
 * @description Get all Categories
 */
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

/**
 * @description Get all Posts from all Categories
 */
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Get all Posts from one Category
 * @param {string} categoryId The Category unique identifier
 */
export const getAllPostsFromCategory = categoryId =>
  fetch(`${api}/${categoryId}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Add a new Post
 * @param {Object} post Full Post object as backend service especifications
 */
export const addNewPost = post =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Get one Posts data
 * @param {String} post The Post unique identifier
 */
export const getPost = postId =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Place a vote to one Post
 * @param {string} postId The Post unique identifier
 * @param {VOTE_OPTIONS} option A constant from Constants.VOTE_OPTIONS
 */
export const placePostVote = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Update some Post fields
 * @param {string} postId The Post unique identifier
 * @param {string} title The new Post title
 * @param {string} body The new Post body
 */
export const updatePost = (postId, title, body, deleted = false) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body, deleted })
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Mark the "deleted" flag field as true for the Post and all ists Comments' objects.
 *        The flag deleted may be updated through {@code updatePost()} function.
 * @param {string} postId The Post unique identifier
 */
export const deletePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Get all Posts from all Categories
 * @param {string} postId The Post unique identifier
 */
export const getAllCommentsFromPost = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Add a new Comment
 * @param {Object} comment Full Comment object as backend service especifications
 */
export const addNewComment = comment =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Place a vote to one Comment
 * @param {string} commentId The Comment unique identifier
 * @param {VOTE_OPTIONS} option A constant from Constants.VOTE_OPTIONS
 */
export const placeCommentVote = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Update some Comment fields
 * @param {string} commentId The Comment unique identifier
 * @param {long} timestamp The Unix Epoch time stamp
 * @param {string} body The new Comment body
 */
export const updateComment = (
  commentId,
  timestamp = Date.now(),
  body,
  deleted = false
) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body, deleted })
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Mark the "deleted" flag field as true for the Comment object.
 *        The flag deleted may be updated through {@code updateComment()} function.
 * @param {string} commentId The Post unique identifier
 */
export const deleteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers
    }
  })
    .then(res => res.json())
    .then(data => data);
