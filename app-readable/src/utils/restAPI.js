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
 * @return A new Promise with Category object array
 */
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

/**
 * @description Get all Posts from all Categories
 * @return A new Promise with Post object array
 */
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Get all Posts from one Category
 * @param {string} categoryId The Category unique identifier
 * @return A new Promise with all Posts of the Category
 */
export const getAllPostsFromCategory = categoryId =>
  fetch(`${api}/${categoryId}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Add a new Post
 * @param {Object} post Full Post object as backend service especifications
 * @return A new Promise with the new added Post
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
 * @return A new Promise with the Post fetched by its id
 */
export const getPost = postId =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Place a vote to one Post
 * @param {string} id The Post unique identifier
 * @param {VOTE_OPTIONS} option A constant from Constants.VOTE_OPTIONS
 * @return A new Promise with the updated Post
 */
export const placePostVote = ({id, option}) =>
  fetch(`${api}/posts/${id}`, {
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
 * @return A new Promise with the updated Post
 */
export const updatePost = ({id, category, title, author, body, deleted = false}) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category, title, author, body, deleted })
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Mark the "deleted" flag field as true for the Post and all ists Comments' objects.
 *        The flag deleted may be updated through {@code updatePost()} function.
 * @param {string} postId The Post unique identifier
 * @return A new Promise with the updated Post
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
 * @return A new Promise with an array of the Post's Comments
 */
export const getAllCommentsFromPost = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Add a new Comment
 * @param {Object} comment Full Comment object as backend service especifications
 * @return A new Promise with the new added Comment
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
 * @param {string} id The Comment unique identifier
 * @param {VOTE_OPTIONS} option A constant from Constants.VOTE_OPTIONS
 * @return A new Promise with the updated Comment
 */
export const placeCommentVote = ({id, option}) =>
  fetch(`${api}/comments/${id}`, {
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
 * @param {string} id The Comment unique identifier
 * @param {long} timestamp The Unix Epoch time stamp
 * @param {string} body The new Comment body
 * @return A new Promise with the updated Comment
 */
export const updateComment = ({
  id,
  timestamp,
  body,
  author,
  deleted = false,
  parendDeleted = false
}) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestamp, body, author, deleted, parendDeleted })
  })
    .then(res => res.json())
    .then(data => data);

/**
 * @description Mark the "deleted" flag field as true for the Comment object.
 *        The flag deleted may be updated through {@code updateComment()} function.
 * @param {string} commentId The Post unique identifier
 * @return A new Promise with the updated Comment
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
