const likesHandler = async (newLikedState, post_id) => {

    try {
      const response = await fetch(
        `https://www.khourychat.com/api/posts/${post_id}/like`,
        {
          method: "PATCH",
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
          },

          body: JSON.stringify({
            action: newLikedState,
            action: newLikedState,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();

      return updatedPost
    } catch (error) {
      console.error("Failed to update likes", error);
    }
  };

export default likesHandler;