"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import CatalogSelect from "@/components/ui/CatalogSelect";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Options = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeData = [
    { key: "tv", value: "TV" },
    { key: "movie", value: "Movies" },
  ];

  const movieGenres = [
    { key: 28, value: "Action" },
    { key: 12, value: "Adventure" },
    { key: 16, value: "Animation" },
    { key: 35, value: "Comedy" },
    { key: 80, value: "Crime" },
    { key: 99, value: "Documentary" },
    { key: 18, value: "Drama" },
    { key: 10751, value: "Family" },
    { key: 14, value: "Fantasy" },
    { key: 36, value: "History" },
    { key: 27, value: "Horror" },
    { key: 10402, value: "Music" },
    { key: 9648, value: "Mystery" },
    { key: 10749, value: "Romance" },
    { key: 878, value: "Science Fiction" },
    { key: 10770, value: "TV Movie" },
    { key: 53, value: "Thriller" },
    { key: 10752, value: "War" },
    { key: 37, value: "Western" }
  ];

  const tvGenres = [
    { key: 10759, value: "Action & Adventure" },
    { key: 16, value: "Animation" },
    { key: 35, value: "Comedy" },
    { key: 80, value: "Crime" },
    { key: 99, value: "Documentary" },
    { key: 18, value: "Drama" },
    { key: 10751, value: "Family" },
    { key: 10762, value: "Kids" },
    { key: 9648, value: "Mystery" },
    { key: 10763, value: "News" },
    { key: 10764, value: "Reality" },
    { key: 10765, value: "Sci-Fi & Fantasy" },
    { key: 10766, value: "Soap" },
    { key: 10767, value: "Talk" },
    { key: 10768, value: "War & Politics" },
    { key: 37, value: "Western" }
  ];

  const [type, setType] = useState(typeData.find(item => item?.key === (searchParams.get("type") || "tv")));
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [genre, setGenre] = useState(null);
  const [genreData, setGenreData] = useState(movieGenres);

  const applyFilters = useCallback(() => {
    const queryParams = new URLSearchParams({
      ...(search && { q: search }),
      ...(type && { type: type.key }),
      ...(genre && { genre: genre.key }),
    });

    router.push(`/collection${queryParams.toString() ? `?${queryParams}` : ""}`);
  }, [search, type, genre]);

  useEffect(() => {
    if (type?.key === "tv") {
      setGenreData(tvGenres);
      setGenre(tvGenres[0]);
    } else {
      setGenreData(movieGenres);
      setGenre(movieGenres[0]);
    }
    applyFilters();
  }, [type]);

  useEffect(() => {
    applyFilters();
  }, [genre, search]);

  return (
    <div className="w-full flex max-[880px]:flex-col gap-4 mb-8">
      <CatalogSelect
        data={typeData}
        active={type}
        setActive={(value) => { setType(value); }}
      />

      <CatalogSelect
        data={genreData}
        active={genre}
        setActive={(value) => { setGenre(value); }}
      />
    </div>
  );
}

export default Options;
