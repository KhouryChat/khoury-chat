const fetchPostAfterReplies = async (post_id) => {
    try {
      const response = await fetch(`https://www.khourychat.com/api/posts/${post_id}/comments`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      //return { [uid]: data.username };
      return data
    } catch (error) {
      console.error('There has been a problem with your fetch reply operation:', error);
      // If there's an error fetching the username, return "Anonymous mouse"
      return {};
    }
  };
  
  export default fetchPostAfterReplies;