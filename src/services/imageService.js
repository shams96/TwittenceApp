export const getRandomImage = async (query) => {
      // In a real app, this would call an image API
      // For now, we'll use placeholder images
      const imageNumber = Math.floor(Math.random() * 10) + 1;
      return `https://placekitten.com/400/${300 + imageNumber}`;
    };
