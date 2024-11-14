/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Card from "@/components/Cards/Card/Card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import Pagination from "./Pagination";
import { providerMovie, providerTV } from "@/lib/MultiFunctions"; // Adjust import paths
import Options from "./Options";

const Movies = () => {
  const searchParams = useSearchParams();

  const [type, setType] = useState(searchParams.get("type" || "movie"));
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [providerId, setproviderId] = useState(searchParams.get("provider"));

  // Update state whenever search parameters change
  useEffect(() => {
    setType(searchParams.get("type") || "movie");
    setPage(Number(searchParams.get("page")) || 1);
    setproviderId(searchParams.get("provider"));
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setMovies([]); // Clear movies on new fetch

    try {
      const data =
        type === "movie"
          ? await providerMovie(providerId, page)
          : await providerTV(providerId, page);

      if (data?.results) {
        setMovies(data.results);
        setTotalPages(data.total_pages || 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [type, page, providerId]);

  // Trigger data fetch on dependency changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadingCards = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, index) => (
        <Card key={index} index={index} loading />
      )),
    []
  );

  return (
    <div className="w-full">
      <Options />

      <div className="w-full h-full grid grid-auto-fit gap-3">
        {loading
          ? loadingCards
          : movies?.map((item, index) => (
              <Card data={item} key={index} type={type} />
            ))}
        {!loading &&
          movies?.length < 6 &&
          Array.from({ length: 8 - movies.length }).map((_, index) => (
            <Card key={index} index={index} hidden />
          ))}
      </div>

      <div className="mt-8"></div>
      {totalPages > 1 && (
        <Pagination
          pageInfo={{
            currentPage: page,
            lastPage: totalPages,
          }}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
};

export default Movies;
