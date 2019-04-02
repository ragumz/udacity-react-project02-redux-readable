# Readable Project of Rafael Araujo Gumz

This is Readable web application project, developed for the final assessment of Udacity's React+Redux Nanodegree course.
The project web page contents were built with React, Redux, Thunk, HTML, JSX, JS and CSS. They are dynamic and use own static CSS and design inspired on previous examples and exercises of this course.
This web application allows the user to manage Posts from a limited set of categories and manage its Comments using React-Redux to share its data and state. It is allowed to add, edit or delete Posts and its Comments, also voting to keep each one's score. There is no authorization or authentication process, as the project's requirements stated.
The data lives only while the `api-server` application is running, stopping or restarting it causes the data reset. Nothing is permanently persisted.

## Building and Deploying

It was developed and manually tested in a NodeJS static server.
Before entering the web application, first is needed to prepare the backend web services rest server:
* Enter `..\api-server` directory.
* Install all dependencies with `npm install`.
* Run `node server` command.

To start navigating on the Readable web application:
* Enter on `\app-readable` directory.
* Install all dependencies with `npm install`.
* Start the development server with `npm start`.

## Project Files Structure
```bash
├── README.md - This file.
├── package.json # npm package manager file. Some new dependecies were added.
└── src
    ├── category
    │   ├── categoryActions.js
    │   ├── CategoryList.js
    │   ├── categoryReducers.js
    │   └── CategoyItem.js
    ├── comment
    │   ├── commentActions.js
    │   ├── CommentEdit.js
    │   ├── CommentItem.js
    │   ├── CommentList.js
    │   ├── commentOperations.js
    │   └── commentReducers.js
    ├── common
    │   ├── commonActions.js
    │   ├── commonOperations.js
    │   ├── commonReducers.js
    │   ├── EntityButtons.js
    │   ├── ErrorBoundary.js
    │   ├── MessageDialog.js
    │   ├── SortListMenu.js
    │   └── VoteScore.js
    ├── home
    │   ├── App.js
    │   ├── Home.js
    │   ├── homeReducers.js
    │   └── Menu.js
    ├── middlewares
    │   ├── index.js
    │   └── loggerMiddleware.js
    ├── post
    │   ├── postActions.js
    │   ├── PostEdit.js
    │   ├── PostItem.js
    │   ├── PostList.js
    │   ├── postOperations.js
    │   └── postsReducers.js
    ├── utils
    │   ├── commons.js
    │   ├── constants.js
    │   ├── readableAPI.js
    │   └── restAPI.js
    ├── index.css # Global styles of the app inspired on all course projects and examples.
    └── index.js # App component was nested into ErrorBoundary and BrowserRouter components.

## Libraries and Dependencies

The following libraries where added to this project through [npm install --save](https://docs.npmjs.com/cli/install):
* [prop-types](https://www.npmjs.com/package/prop-types) - As instructed on the React Fundamentals course.
* [@material-ui/core](https://www.npmjs.com/package/@material-ui/core) - Used some UI components like TextField, Button, Fab, Dialog etc.
* [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons) - Used some selected SVG icons to enrich UI and user UX.
* [react-dom](https://www.npmjs.com/package/react-dom) - Needed to React manages the DOM state and server renderers.
* [react-icons](https://www.npmjs.com/package/react-icons) - Used some selected SVG icons to enrich UI and user UX.
* [react-redux](https://www.npmjs.com/package/react-redux) - Main requirement to manage application state globally with Redux API container.
* [react-redux-loading](https://www.npmjs.com/package/react-redux-loading) - A React-Redux loading bar API to easy long process wait.
* [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Needed to route creation as a project requirement and navigation.
* [react-thunk](https://www.npmjs.com/package/react-thunk) - Enable thunk middleware to React components.
* [redux](https://www.npmjs.com/package/redux) - Redux API container to manage predictable state.
* [redux-thunk](https://www.npmjs.com/package/redux-thunk) - Enable thunk middleware to Redux.

## Main Page


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Backend Server

To simplify the development process, Udacity provided a backend server to develop against.
The backend API uses a fixed set of categories, posts and comments data. It is kept on JavaScript files at `..\api-server\**` path.

To interact with REST web service operations on this backend server the [`restAPI.js`](src\utils\restAPI.js) contains the methods to perform necessary operations on the backend:

* [`getAllCategories`](#categories)
* [`getAllPosts`](#posts)
* [`getAllPostsFromCategory`](#/${categoryId}/posts)

## Final Notes

* This repository contains a particular React project code for Udacity instructors evaluation only.
* Students are encouraged to try developing this exercise by themselves and "NOT TO COPY" the source codes.
* All the text, comments and documentation was made in English, to practice and foreseeing future Udacity courses.
* The Git commit messages were short and clean.
* It was reused some code and concepts from my [`React Fundamentals My Reads project`](https://github.com/ragumz/udacity-react-project01-myreads).
* All the source code were produced between 20 and 00:30 hours after a long day of 9 hours of architecture and programming. Also on weekends, when my 1 year old daughter allowed. That is student life!