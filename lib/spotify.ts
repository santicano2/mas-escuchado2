import { GameMode } from "./types";

export const getSpotifyToken = async (): Promise<string> => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      )}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
};

export const searchSpotifyTracks = async (
  mode: GameMode,
  token: string
): Promise<any[]> => {
  const yearQuery = {
    current: "year:2024-2025",
    "2020": "year:2020-2029",
    "2010": "year:2010-2019",
    "2000": "year:2000-2009",
    "1990": "year:1990-1999",
    "1980": "year:1980-1989",
    random: "year:1980-2023",
  }[mode];

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${yearQuery} popularity:>70&type=track&limit=50`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await response.json();
  return data.tracks.items;
};
