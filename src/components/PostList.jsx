import Post from './Post.jsx';

function PostList({ posts }) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} body={post.body} />
      ))}
    </div>
  );
}

export default PostList;
