# Assignment 6 – Post Dashboard

A small React (Vite) app that loads posts from
`https://jsonplaceholder.typicode.com/posts`, shows loading / error / empty
states, and lets the user filter posts by title.

## Run

```bash
npm install
npm run dev
```

## File organization

```
src/
├─ api/postsApi.js         # fetchPosts(): only fetch logic, no JSX, no React
├─ reducer/postsReducer.js # pure reducer: FETCH_START / FETCH_SUCCESS / FETCH_ERROR
├─ components/
│  ├─ Post.jsx             # presentational: renders title and body
│  ├─ PostList.jsx         # pure list: maps posts to <Post /> with key={post.id}
│  └─ FilterForm.jsx       # controlled input for the title filter
├─ App.jsx                 # owns useReducer, useEffect fetch, filter state
└─ main.jsx                # entry point
```

- `App` owns the async state (`useReducer`) and the filter text (`useState`).
- The fetch happens in a single `useEffect` on mount; the UI components never fetch.
- The filtered list is **derived during render** from `posts` + `filter`; it is never stored in state or computed in an effect.

## Challenges I faced

- **Cleanup / memory leaks:** the effect creates an `AbortController` and aborts it on cleanup. An aborted request throws `AbortError`, which I ignore so it is not shown as a user-facing error. This also behaves correctly under React StrictMode, which runs effects twice in development.
- **HTTP errors:** `fetch` does not reject on 404/500, so `fetchPosts` checks `response.ok` and throws manually so that the `try/catch` in `App` can dispatch `FETCH_ERROR`.
- **Derived state:** it was tempting to store filtered posts in state, but this creates duplicated data that can go out of sync. Filtering during render keeps a single source of truth.
- **Keeping the reducer pure:** all async work lives in `App`'s effect; the reducer only returns new state objects.
