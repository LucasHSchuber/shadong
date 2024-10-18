import React, { useEffect } from "react";
import axios from "axios";

import API_URL from '../../../apiConfig.js'
console.log('API_URL', API_URL);





type Song = {
    song_id: string;
    spotify_id: string;
    name: string;
    genres: string;
    title: string;
    artist: string,
    image_url: string,
    spotify_uri: string
}

interface FetchSongsProps {
  setSongsData: (songs: Song[]) => void;
  setTopGenres: (genres: { genre: string; count: number }[]) => void;
}

const FetchSongs: React.FC<FetchSongsProps> = ({ setSongsData, setTopGenres }) => {

  useEffect(() => {
    const fetchSongs = async () => {
      const userId = sessionStorage.getItem("user_id");

      try {
        const response = await axios.get(`${API_URL}api/users/${userId}/songs`);
        console.log('response', response);

        if (response.data.length > 0) {
          setSongsData(response.data.reverse());

          let genreArray: string[] = [];

          // Fill genreArray with genres from the songs
          response.data.forEach((song: Song) => {
            genreArray.push(...song.genres.split(',').map(genre => genre.trim()));
          });

          // Count occurrences of each genre
          const genreCount = genreArray.reduce<{ [key: string]: number }>((acc, genre) => {
            acc[genre] = (acc[genre] || 0) + 1;
            return acc;
          }, {});

          // Convert genreCount object to an array of objects
          const topGenresArray = Object.entries(genreCount).map(([genre, count]) => ({
            genre,
            count,
          }));

          console.log('topGenresArray', topGenresArray);

          const topGenres = topGenresArray.filter(g => g.genre !== "Music");
          console.log('topGenres', topGenres);

          const topGenresSorted = topGenres.sort((a, b) => b.count - a.count);
          console.log('topGenresSorted', topGenresSorted);

          setTopGenres(topGenresSorted);
        }
      } catch (err) {
        console.log('err', err);
      }
    };

    fetchSongs();
  }, [setSongsData, setTopGenres]);

  return null;
};

export default FetchSongs;
