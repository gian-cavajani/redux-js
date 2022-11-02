import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllPosts,
  getPostsErrors,
  getPostsStatus,
  fetchPosts,
} from './postsSlice';

import PostsExcerpt from './PostsExcerpt';

const PostsList = () => {
  const dispatch = useDispatch();
  
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsErrors);
  
  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  console.log(posts);
  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading..</p>;
  } else if (postsStatus === 'succeeded') {
    content = posts.map((post) => <PostsExcerpt key={post.id} post={post} />);
  } else if (postsStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default PostsList;
