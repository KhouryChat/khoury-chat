const fetchUserName = async (uid) => {
    try {
      const response = await fetch(`https://www.khourychat.com/api/users/${uid}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      //return { [uid]: data.username };
      return data.username
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      // If there's an error fetching the username, return "Anonymous mouse"
      return 'Anonymous mouse';
    }
  };
  
  export default fetchUserName;