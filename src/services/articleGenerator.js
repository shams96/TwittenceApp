import { getRandomImage } from './imageService';

    const templates = {
      'Taylor Swift New Album': [
        "Breaking news in the music world! Taylor Swift's latest album is taking fans by storm. The pop sensation has once again proven why she's the queen of the music industry. With chart-topping hits and deep lyrics, this album is set to break all previous records. #SwiftiesUnite #NewAlbum",
        "Taylor Swift does it again! Her new album is a masterpiece of storytelling and musical innovation. Critics are calling it her best work yet, and fans can't stop talking about the hidden meanings in each track. #TaylorSwift #MusicNews",
        "The wait is over! Taylor Swift's new album has dropped, and it's everything fans hoped for and more. With production quality that sets new industry standards, this album is already breaking streaming records. #SwiftEra #NewMusic"
      ],
      'AI Revolution': [
        "The AI revolution is here, and it's transforming everything! From healthcare to entertainment, artificial intelligence is making unprecedented advances. Experts predict this is just the beginning of a technological renaissance. #AI #TechNews #Future",
        "Artificial Intelligence breakthroughs are happening daily! The latest developments in machine learning are pushing the boundaries of what we thought possible. Industry leaders are racing to adapt to this new era. #AITechnology #Innovation",
        "The future is now! AI technologies are revolutionizing how we live and work. With new applications emerging across industries, the AI revolution is reshaping our world faster than ever. #ArtificialIntelligence #TechTrends"
      ],
      'Global Warming': [
        "Climate scientists release alarming new data about global warming trends. The latest research shows unprecedented changes in global temperature patterns. Action is needed now more than ever. #ClimateChange #Environment #SaveEarth",
        "Breaking: New studies reveal the accelerating impact of global warming on ecosystems worldwide. Environmental experts call for immediate action as temperature records continue to break. #GlobalWarming #ClimateAction",
        "Environmental alert: Global warming effects are becoming more visible than ever. From rising sea levels to extreme weather events, the evidence is undeniable. #ClimateEmergency #Environment"
      ]
    };

    const generateArticleContent = (title) => {
      const contentArray = templates[title] || [];
      return contentArray[Math.floor(Math.random() * contentArray.length)] || 
        `The latest buzz is all about ${title}. This trending topic is capturing attention worldwide. Stay tuned for more updates! #trending #news`;
    };

    const generateSEOTags = (title, content) => {
      const words = [...title.toLowerCase().split(' '), ...content.toLowerCase().split(' ')];
      const tags = new Set(words.filter(word => word.length > 3));
      return Array.from(tags).slice(0, 5);
    };

    export const generateArticle = async (trend) => {
      const content = generateArticleContent(trend.title);
      const imageUrl = await getRandomImage(trend.title);
      const seoTags = generateSEOTags(trend.title, content);
      
      return {
        id: trend.id,
        title: `Breaking: ${trend.title}!`,
        content,
        imageUrl,
        tags: [...trend.keywords, ...seoTags],
        views: 0,
        ctr: 0,
        seoRanking: 'N/A',
        votes: { hot: 0, not: 0 },
        comments: [],
        timestamp: new Date().toLocaleString(),
        shareCount: 0
      };
    };
