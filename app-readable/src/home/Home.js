import React from 'react';
import CategoryList from '../category/CategoryList';
import PostList from '../post/PostList';

/**
 * @description Home page React Component with all categories and posts lists
 */
const Home = () => {

  /**
   * @description Lifecycle function to create component HTML contents with JSX
   */
  return (
    <div>
      <CategoryList />
      <PostList />
    </div>
  );
}

export default Home