/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Card from "@/components/Cards/Card/Card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import Pagination from "./Pagination";
import { getMultiSearch, getSearch } from "@/lib/MultiFunctions";
import Options from "./Options";
import { getTrendingMovies } from "@/lib/MoviesFunctions";


const Movies = () => {
  const searchParams = useSearchParams();

  // Initialize states from search parameters
  const [type, setType] = useState(searchParams.get("type") || "All");
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [isAdult, setIsAdult] = useState(searchParams.get("isAdult") === "true");


  // Update state when search parameters change
  useEffect(() => {
    const updatedPage = Number(searchParams.get("page")) || 1;
    const updatedIsAdult = searchParams.get("isAdult") === "true";
    const updatedSearch = searchParams.get("q") || "";
    const updatedType = searchParams.get("type") || "all";


    setPage(updatedPage);
    setIsAdult(updatedIsAdult);
    setSearch(updatedSearch);
    setType(updatedType);
  }, [searchParams]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await (
          search !== "" ?
            type === "all"
              ? getMultiSearch(search, page, isAdult)
              : getSearch(search, page, isAdult, type.toLowerCase())
            : getTrendingMovies(type.toLowerCase(), page)
        );
        if (data?.results) {
          setMovies(data.results);
          setTotalPages(data.total_pages || 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, type, page, isAdult]);


  const loadingCards = useMemo(() => Array.from({ length: 40 }).map((_, index) => <Card key={index} index={index} loading />), []);

  return (
    <div className="w-full">


      <Options />

      <div className="w-full h-full grid grid-auto-fit gap-3">
        {loading ? loadingCards : movies?.map((item, index) => <Card data={item} key={index} type={type} />)}
        {(!loading && movies?.length < 6) && Array.from({ length: 8 - movies?.length }).map((_, index) => <Card key={index} index={index} hidden />)}
      </div>

      <div className="mt-8"></div>
      {(totalPages) ? <Pagination pageInfo={{
        currentPage: page,
        lastPage: totalPages - 2
      }} /> : null}


    </div>
  );
};

export default Movies;
