import { useEffect, useReducer } from 'react';
import { fetchPosts } from './api/postsApi.js';
import { postsReducer, initialState } from './reducer/postsReducer.js';
import PostList from './components/PostList.jsx';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  useEffect(() => {
    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetchPosts();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    }

    loadPosts();
  }, []);

  const { posts, loading, error } = state;

  return (
    <div className="app">
      <h1>Post Dashboard</h1>

      {loading && <p>Loading posts...</p>}
      {error && <p role="alert">Error: {error}</p>}
      {!loading && !error && posts.length === 0 && <p>No posts found.</p>}
      {!loading && !error && posts.length > 0 && <PostList posts={posts} />}
    </div>
  );
}

export default App;