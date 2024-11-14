"use client"; // Add this line

import { useState, useEffect } from "react";
import FeaturedCard from "@/components/Cards/featuredCard/FeaturedCard";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import { fetchCollectionCards } from "@/lib/MultiFunctions"

const Collection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await fetchCollectionCards();
      setData(fetchedData);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">
          | Featured Collections
        </h1>

        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition"
        >
          {isExpanded ? "Show Less" : "See All"} {isExpanded ? <FaArrowDown /> : <FaArrowRight />}
        </div>
      </div>

      <div className="mt-8 mb-52 grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-3">
        {data.slice(0, isExpanded ? data.length : 4).map((item, index) => (
          <Link key={index} href={{
            pathname: `/collection`,
            query: { type: "movie", genre: item.type },
          }} passHref>
            <div>
              <FeaturedCard data={item} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collection;
