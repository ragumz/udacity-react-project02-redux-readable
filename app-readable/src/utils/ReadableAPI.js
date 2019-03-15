import * as api from './restAPI';
import * as commons from './common';

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
  if (commons.isEmpty(posts)) {
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
        if (!commons.isEmpty(arrComment)) {
          comments = comments.concat(arrComment);
        }
      }
      return new Promise((res, rej) => res(comments));
    });
}

export function placePostVote(vote) {
  return api.placePostVote(vote)
}