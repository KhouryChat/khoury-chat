const fetchUserName = async (uid) => {
    try {
      const response = await fetch(`https://www.khourychat.com/api/users/${uid}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return { [uid]: data.username };
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      // If there's an error fetching the username, return "Anonymous mouse"
      return { [uid]: 'Anonymous mouse' };
    }
  };
  
  export default fetchUserName;