# Readable Project of Rafael Araujo Gumz

This is Readable web application project, developed for the final assessment of Udacity`s React+Redux Nanodegree course.
The project web page contents were built using React, Redux, Thunk, JSX, HTML, MaterialUI, JS and CSS. They are dynamic and use own static CSS and design inspired on previous examples and exercises of this course.
This web application allows the user to manage Posts from a limited set of categories and manage its Comments using React-Redux to share its data and state across pages. It is allowed to add, edit or delete Posts and its Comments, also voting to keep each one`s score. There is no authorization or authentication process, as the project`s requirements stated.
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
    │   ├── categoryActions.js # Middleware actions to manage Category entities
    │   ├── CategoryList.js # React component to render a list of CategoryItem component
    │   ├── categoryReducers.js # Redux reducers executors for Category actions
    │   └── CategoyItem.js # React component to render Category entity content
    ├── comment
    │   ├── commentActions.js # Middleware actions to manage Comment entities
    │   ├── CommentEdit.js # React component to render Comment entity content within inputs, allowing user to change its field values and save or delete the object.
    │   ├── CommentItem.js # React component to render Comment entity content, having buttons to edit or delete, allowing inline edit with CommentEdit component
    │   ├── CommentList.js # React component to render a list of all Post Comments with CommentItem component
    │   ├── commentOperations.js # Comment entity exclusive functions to interact with the backend server REST web services and Redux state
    │   └── commentReducers.js # Redux reducers executors for Comment actions
    ├── common
    │   ├── commonActions.js # Middleware actions to manage global Common values and behaviors
    │   ├── commonOperations.js # Global Common functions to manage values and behaviors
    │   ├── commonReducers.js # Redux reducers executors for Common actions
    │   ├── EntityButtons.js # React component to standadize Post and Comment user UI button actions to view, edit and remove objects through actions
    │   ├── ErrorBoundary.js # React component to catch global React and JavaScript errors, log them into console and show a dialog.
    │   ├── MessageDialog.js # React component to show/hide a modal dialog window with a title, a message and buttons.
    │   ├── SortListMenu.js # React component to standardize entity collections sort fields and order.
    │   └── VoteScore.js # React component to standardize Post or Comment voteScore field update
    ├── home
    │   ├── App.js # Root React component of the app. It contains the starters UI React components and Routes declarations.
    │   ├── Home.js # React component to exhibit on root route (/).
    │   ├── homeReducers.js # Redux centralized app reducers combinations.
    │   └── Menu.js # React component of app toolbar and contextual menu items
    ├── middlewares
    │   ├── index.js # Thunk centralized middleware declaration
    │   └── loggerMiddleware.js # Thunk middleware to log reducers state changes.
    ├── post
    │   ├── postActions.js # Middleware actions to manage global Post values and behaviors
    │   ├── PostEdit.js # React component to render Post entity content within inputs, allowing user to change its field values and save, undo changes or delete the object. It also have readonly mode, just to view its exclusive Comments with CommentList component.
    │   ├── PostItem.js # React component to render Post entity content, having buttons to view, edit or delete, allowing navigation to edit with PostEdit component
    │   ├── PostList.js # React component to render a list of all app Posts with PostItem component.
    │   ├── postOperations.js # Post entity exclusive functions to interact with the backend server REST web services and Redux state
    │   └── postsReducers.js # Redux reducers executors for Post actions
    ├── utils
    │   ├── commons.js # Utility functions to provide common tools.
    │   ├── constants.js # Freezed Objects as enumerations and other app constant values.
    │   ├── readableAPI.js # API functions to encapsulate restAPI calls
    │   └── restAPI.js # API functions to interact with backend server REST web services using Promises
    ├── index.css # Global styles of the app inspired on all course projects and examples.
    └── index.js # App component was nested into ErrorBoundary and BrowserRouter components.
```

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

## Web Application Pages and Navigation

A toolbar was fixed on the top of every page set at `App` React component, containing the web application title and two buttons named `Home` and `New Post`. It may also contain contextual buttons (or menu items) added on each page through commonActions and commonReducers functions processed at `Menu` React component.

The main page (/) presents all Category and Post entities fetched from backend server. Clicking on one Category take the user to its page (/category/[name]), where it presents a list of all its Posts.
Each Post panel contains buttons to view, edit or delete the Post object, also to increment or decrement the Post vote score field.

Clicking on a Post panel upright icon, except delete, the user is sent to the `PostEdit` React component, where he/she can view (/post/view/[postId]/[bool_fixedCategory|empty]) and/or edit (/post/edit/[postId]/[bool_fixedCategory|empty]) almost all selected Post fields values. On this component the user can also see all `CommentItem` React component displaying a Comment entity details on a `CommentList` React component. The Comments of a Post are fetched from backend server only if the user view or edit one Post entity.
The user is allowed to create or edit a Comment inline, at the top of the `CommentList` elements.

At almost all Category, Post and Comment React components, some action buttons may be contextually shown to create, save or undo entity value editions, delete entity or go back to exit the current page or action. Some of them being shown on the app toolbar.

When opened the `CategoryItem` React component clicking on a Category entity name link (/category/[categoryId]), the opened page shows all the Category\`s Post entities on each `PostItem` React component enlisted by `PostList` React component. If the user decides to edit a Post from this page, he/she cannot change the category.
If the user clicks on the New Post button (/post/new/[categoryName|empty]) at the toolbar or the PostItem HTML panel button, being on the Category page, the new Post will have this parent Category fixed and the user cannot change it. However, if the user create a new Post or edit an existing one outside the `CategoryItem` page, the category may be changed freely.

On any deletion action button, a modal dialog window is opened to ask the user to confirm the decision, because the entity is deleted permanently and may not be recovered.

# Caveats

Some caveats that could be improved on future releases:
* All React components of this project were created trying to follow the DO ONE THING principle and all good practices taught during the course, however due to React development unexperience, they may have grown more than expected.
* The components should be better segregated to Presentational and Container Components, may even use PureComponents.
* Some common behavior should be placed on a parent component class and inherited.
* On Post or Comment edit, detect if the values changed before handling backend and redux state data saving.
* Make list sorting options save by page route.
* Improve Udacity api-server to manage more fields and operations to better Category, Post and Comment use.
* The CSS should be improved.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Backend Server

To simplify the development process, Udacity provided a backend server to develop against.
The backend API uses a fixed set of categories, posts and comments data.
It is kept on JavaScript files at `..\api-server\**` path.

To interact with REST web service operations on this backend server the [`restAPI.js`](https://github.com/ragumz/udacity-react-project02-redux-readable/blob/master/app-readable/src/utils/restAPI.js) contains the methods to perform necessary operations on the backend:

* [`getAllCategories`]
* [`getAllPosts`]
* [`getAllPostsFromCategory(categoryId)`]
* [`addNewPost(post)`]
* [`getPost(postId)`]
* [`placePostVote({id, option})`]
* [`updatePost({id, category, title, author, body, deleted = false})`]
* [`deletePost(postId)`]
* [`getAllCommentsFromPost(postId)`]
* [`addNewComment(comment)`]
* [`placeCommentVote({id, option})`]
* [`updateComment`]
* [`deleteComment(commentId)`]

## Final Notes

* This repository contains a particular React project code for Udacity instructors evaluation only.
* Students are encouraged to try developing this exercise by themselves and "NOT TO COPY" the source codes.
* All the text, comments and documentation was made in English, to practice and foreseeing future Udacity courses. However, some errors may have been left behind due the lack of revision time!
* The Git commit messages were short and clean.
* It was reused some code and concepts from [`React Fundamentals My Reads project`](https://github.com/ragumz/udacity-react-project01-myreads) of my creation.
* All the source code were produced between 20 and 00:30 hours after a long day of 9 hours of architecture, engineering and programming. Also produded on weekends, when my 1 year old daughter allowed. That is mid-age student life!