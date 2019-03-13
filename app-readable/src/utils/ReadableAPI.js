import * as Api from './RestAPI';
import * as Commons from './Commons';

export function getInitialData() {
  return Promise.all([
      Api.getAllCategories(),
      Api.getAllPosts()
    ]).then(([categories, posts]) => ({
      categories,
      posts,
    })
  );
}

export function getAllComments(posts) {
  if (Commons.isEmpty(posts)) {
    return new Promise();
  }
  const tasks = posts.map(post => Api.getAllCommentsFromPost(post.id));
  return tasks
    .reduce((promiseChain, currentTask) => {
      return promiseChain.then(chainResults =>
        currentTask.then(currentResult => [...chainResults, currentResult])
      );
    }, Promise.resolve([]))
    .then(arrayOfResults => {
      let comments = [];
      for (let arrComment of arrayOfResults) {
        if (!Commons.isEmpty(arrComment)) {
          comments = comments.concat(arrComment);
        }
      }
      return new Promise((res, rej) => res(comments));
    });
}
