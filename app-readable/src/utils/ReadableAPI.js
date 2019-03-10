import * as Api from './RestAPI'

export function getInitialData () {
  return Promise.all([
    Api.getAllCategories(),
    Api.getAllPosts(),
  ]).then(([categories, posts]) => ({
    categories,
    posts,
  }))
}