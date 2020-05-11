import { useState, useEffect } from 'react';
import { getPostList, postScrap, deleteScrap } from '../../API/Post';
import produce from 'immer';

function usePostList(type, scrollerFooter) {
  const [posts, setPosts] = useState([]);
  const [eol, setEol] = useState(false);
  const [isLoading, setLoading] = useState(true);

  let limit = 1;

  const getPosts = async () => {
    try {
      const payload = await getPostList(type, limit);
      if (payload.success) {
        const newPosts = payload.result.Posts;
        console.log('new posts: ' + newPosts);
        limit += 1;
        return newPosts;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const scrapHandler = async (postId, isScrap, index) => {
    console.log('scrapHandler', postId, isScrap, index);
    let updateIsScrap = null;

    if (isScrap) {
      const payload = await deleteScrap(postId);
      if (payload.success) {
        updateIsScrap = 0;
      } else {
        return false;
      }
    } else {
      const payload = await postScrap(postId);
      if (payload.success) {
        updateIsScrap = 1;
      } else {
        return false;
      }
    }

    setPosts(prevPosts => {
      const postList = prevPosts;
      const nextPostList = produce(postList, draftList => {
        draftList[index].IsScrap = updateIsScrap;
      });
      console.log(nextPostList);
      return nextPostList;
    });
    return true;
  };

  useEffect(() => {
    const scrollerRef = scrollerFooter.current;
    
    if (eol) return;

    const callback = async entries => {
      setLoading(true);
      try {
        if (entries[0].isIntersecting) {
          const newPosts = await getPosts();
          if (newPosts.length)
          {
            return setPosts(prevPosts => prevPosts.concat(newPosts));
          }
          setEol(true);
          intersectionObserver.unobserve(scrollerRef);
          return;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    const options = {
      rootMargin: '0px 0px 200px 0px'
    };
    var intersectionObserver = new IntersectionObserver(callback, options);
    intersectionObserver.observe(scrollerRef);

    return () => {
      setLoading(false);
      intersectionObserver.unobserve(scrollerRef);
    };
  }, []);

  return {
    posts,
    scrapHandler,
    eol,
    isLoading,
  };
}

export default usePostList;
