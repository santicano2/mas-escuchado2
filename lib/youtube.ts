interface Track {
  name: string;
  artist: string;
  views: number;
  image: string;
  youtubeId: string;
}

const searchYouTubeVideo = async (
  trackName: string,
  artistName: string
): Promise<string | null> => {
  try {
    const query = `${trackName} ${artistName} official music video`;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=id&q=${encodeURIComponent(
        query
      )}&type=video&key=${process.env.YOUTUBE_API_KEY}&maxResults=1`
    );

    const data = await response.json();

    // Add detailed logging
    console.log("YouTube Search Response:", data);

    // Check if items exist and has at least one item
    if (data.items && data.items.length > 0) {
      return data.items[0]?.id?.videoId || null;
    }

    console.warn("No YouTube videos found for:", query);
    return null;
  } catch (error) {
    console.error("YouTube Search Error:", error);
    return null;
  }
};

const getYouTubeViews = async (videoId: string): Promise<number> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    // Add detailed logging
    console.log("YouTube Views Response:", data);

    // Check if items exist and has at least one item
    if (data.items && data.items.length > 0) {
      return parseInt(data.items[0]?.statistics?.viewCount || "0", 10);
    }

    console.warn("No views found for video:", videoId);
    return 0;
  } catch (error) {
    console.error("YouTube Views Error:", error);
    return 0;
  }
};

export const fetchTracksWithViews = async (
  spotifyTracks: any[]
): Promise<Track[]> => {
  const tracksWithViews: Track[] = [];

  for (const track of spotifyTracks) {
    const youtubeId = await searchYouTubeVideo(
      track.name,
      track.artists[0].name
    );

    if (youtubeId) {
      const views = await getYouTubeViews(youtubeId);

      tracksWithViews.push({
        name: track.name,
        artist: track.artists[0].name,
        views,
        image: track.album.images[0]?.url || "/default-image.jpg",
        youtubeId,
      });
    }
  }

  return tracksWithViews.filter((track) => track.views > 0);
};
