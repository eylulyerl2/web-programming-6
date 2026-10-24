# Assignment 6 – Post Dashboard

A React app built with Vite that fetches posts from JSONPlaceholder, shows loading, error and empty states, and filters posts by title.


## File Organization

```
src/
├── api/
│   └── postsApi.js       # fetchPosts(): data fetching only, no React or JSX
├── components/
│   ├── Post.jsx          # Shows a single post (title + body), no state
│   ├── PostList.jsx      # Maps posts to <Post /> using post.id as key
│   └── FilterForm.jsx    # Controlled input for filtering by title
├── reducer/
│   └── postsReducer.js   # Pure reducer: FETCH_START / FETCH_SUCCESS / FETCH_ERROR
├── App.jsx               # Owns state, fetches on mount, derives filtered posts
└── main.jsx              # Entry point
```

- **API layer** only knows how to get data. It doesn't know anything about React.
- **Reducer** only describes how state changes. It has no async code or side effects.
- **App** connects everything: it runs the fetch in `useEffect`, dispatches actions and passes data down.
- **Components** only render the props they receive.

## Challenges

**1. `fetch` doesn't throw on HTTP errors.**
At first I expected a 404 to go straight to the `catch` block, but `fetch` only rejects on network failures. I added a `response.ok` check in `postsApi.js` to throw an error myself. I tested it by changing the URL to a wrong one and saw the error message on screen without the app crashing.

**2. Posts were fetched twice.**
In the Network tab I saw two requests to `/posts`. This happens because `StrictMode` runs effects twice in development. I added an `AbortController` and returned `controller.abort()` as the cleanup function, so the first request gets cancelled. Cancelled requests throw an `AbortError`, so I ignore that case instead of showing it as an error.

**3. Not storing filtered posts in state.**
My first idea was to keep a `filteredPosts` state and update it in a `useEffect`. But this would copy data that can already be calculated from `posts` and `filter`, and the two could get out of sync. Instead I calculate `filteredPosts` during render, so only the source data is stored.

**4. Two different "empty" situations.**
"The API returned no posts" and "no posts match the filter" are different situations, so I show a different message for each one.

**5. Building the project step by step.**
I built `App.jsx` in stages (fetching → UI states → cleanup → filtering) and committed after each stage, so the commit history shows how the app grew.