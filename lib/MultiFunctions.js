
export const getMultiSearch = async (query, page, isadult) => {
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=${isadult === true}&language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url,
      { next: { caches: "no-cache" } }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export const getSearch = async (query, page = 1, isAdult = false, type = 'movie') => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('API key is missing.');
  }

  const url = `https://api.themoviedb.org/3/search/${type === "movies" ? "movie" : type}?query=${encodeURIComponent(query)}&include_adult=${isAdult}&language=en-US&page=${page}&api_key=${apiKey}`;

  console.log(url);

  try {
    const res = await fetch(url, { next: { caches: "no-cache" } });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json(); // Store the result
    return data; // Return the stored result
  } catch (error) {
    console.error(`Failed to fetch search results: ${error.message}`);
    throw error;
  }
};

export const getGenereMovie = async (genreId, page = 1) => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing.");
  }

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=${page}`;

  try {
    const res = await fetch(url, { next: { caches: "no-cache" } });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch discover results: ${error.message}`);
    throw error;
  }
};

export const getGenereTV = async (genreId, page = 1) => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing.");
  }

  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=${page}`;

  try {
    const res = await fetch(url, { next: { caches: "no-cache" } });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch discover results: ${error.message}`);
    throw error;
  }
};

export const providerMovie = async (providerId, page = 1) => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing.");
  }

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&with_watch_providers=${providerId}&watch_region=US`;

  try {
    const res = await fetch(url, { next: { caches: "no-cache" } });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch discover results: ${error.message}`);
    throw error;
  }
};

export const providerTV = async (providerId, page = 1) => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing.");
  }

  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=${page}&with_watch_providers=${providerId}&watch_region=US`;

  try {
    const res = await fetch(url, { next: { caches: "no-cache" } });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch discover results: ${error.message}`);
    throw error;
  }
};

export async function fetchallGenre(genreId) {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing.");
  }
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=1`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  return data.results.slice(0, 3).map(movie => `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
}

export async function fetchCollectionCards() {
  const genres = [
    { name: "Action", id: 28 },
    { name: "Horror", id: 27 },
    { name: "Romance", id: 10749 },
    { name: "Crime", id: 80 },
  ];
  
  const data = await Promise.all(
    genres.map(async genre => {
      const images = await fetchallGenre(genre.id);
      return {
        text: `The best of ${genre.name}`,
        type: genre.id,
        image: images,
      };
    })
  );

  return data;
}
