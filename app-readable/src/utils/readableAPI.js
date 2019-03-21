import * as api from './restAPI';
import * as common from './common';

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

export function getAllComments(posts) {
  if (common.isEmpty(posts)) {
    return new Promise();
  }
  const tasks = posts.map(post => api.getAllCommentsFromPost(post.id));
  return tasks
    .reduce((promiseChain, currentTask) => {
      return promiseChain.then(chainResults =>
        currentTask.then(currentResult => [...chainResults, currentResult])
      );
    }, Promise.resolve([]))
    .then(arrayOfResults => {
      let comments = [];
      for (let arrComment of arrayOfResults) {
        if (!common.isEmpty(arrComment)) {
          comments = comments.concat(arrComment);
        }
      }
      return new Promise((res, rej) => res(comments));
    });
}

export function placePostVote(vote) {
  return api.placePostVote(vote)
}

export function addNewPost(post) {
  return api.addNewPost(post);
}

export function updatePost(post) {
  return api.updatePost(post)
}

export function deletePost(postId) {
  return api.deletePost(postId)
}

export function placeCommentVote(vote) {
  return api.placeCommentVote(vote);
}

export function deleteComment(commentId) {
  return api.deleteComment(commentId);
}

export function updateComment(comment) {
  return api.updateComment(comment);
}