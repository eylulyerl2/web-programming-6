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

  return (
    <div className="app">
      <h1>Post Dashboard</h1>
      <PostList posts={state.posts} />
    </div>
  );
}

export default App;