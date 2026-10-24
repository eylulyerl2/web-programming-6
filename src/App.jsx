import { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from './api/postsApi.js';
import { postsReducer, initialState } from './reducer/postsReducer.js';
import FilterForm from './components/FilterForm.jsx';
import PostList from './components/PostList.jsx';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        // Aborted requests (unmount / StrictMode re-run) are not real errors.
        if (error.name === 'AbortError') return;
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    }

    loadPosts();

    // Cleanup: cancel the in-flight request to avoid memory leaks
    // and state updates after unmount.
    return () => controller.abort();
  }, []);

  const { posts, loading, error } = state;

  // Derived state: computed during render, never stored in state.
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.trim().toLowerCase())
  );

  const isReady = !loading && !error;

  return (
    <div className="app">
      <h1>Post Dashboard</h1>
      <FilterForm value={filter} onChange={setFilter} />

      {loading && <p>Loading posts...</p>}
      {error && <p role="alert">Error: {error}</p>}

      {isReady && posts.length === 0 && <p>No posts found.</p>}
      {isReady && posts.length > 0 && filteredPosts.length === 0 && (
        <p>No posts match "{filter}".</p>
      )}
      {isReady && filteredPosts.length > 0 && <PostList posts={filteredPosts} />}
    </div>
  );
}

export default App;