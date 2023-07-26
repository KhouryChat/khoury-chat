const dislikesHandler = async (newDislikedState, post_id) => {

    try {
      const response = await fetch(
        `https://www.khourychat.com/api/posts/${post_id}/dislike`, // change this to match your dislike API endpoint
        {
          method: "PATCH",
          body: JSON.stringify({
            action: newDislikedState,
            action: newDislikedState,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();

      return updatedPost;
    } catch (error) {
      console.error("Failed to update dislikes", error);
    }
  };

  export default dislikesHandler;