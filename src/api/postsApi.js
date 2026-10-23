const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// Data-fetching only: no JSX, no React imports.
// An optional AbortSignal lets the caller cancel the request.
export async function fetchPosts(signal) {
  const response = await fetch(POSTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
