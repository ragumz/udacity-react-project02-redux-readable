const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
  categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      },
      {
        name: 'astronomy',
        path: 'astronomy'
      },
      {
        name: 'movies',
        path: 'movies'
      },
      {
        name: 'books',
        path: 'books'
      },
      {
        name: 'games',
        path: 'games'
      },
      {
        name: 'health',
        path: 'health'
      },
      {
        name: 'cars',
        path: 'cars'
      },
      {
        name: 'family',
        path: 'family'
      },
  ]
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

module.exports = {
  getAll
}
