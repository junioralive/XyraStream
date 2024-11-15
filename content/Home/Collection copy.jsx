"use client"; // Add this line

import { useState } from "react";
import FeaturedCard from "@/components/Cards/featuredCard/FeaturedCard";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import Link from "next/link";

const Collection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const data = [
    {
      text: "The best of Action",
      type: "action",
      image: [
        "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        "https://media.themoviedb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
        "https://media.themoviedb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      ]
    },
    {
      text: "The best of Horror",
      type: "romance",
      image: [
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9260-tbZARfVq8JoX.png",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/21650-qFjRMXrw1jku.jpg",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97863-79AXrUZ7VQa5.jpg",
      ]
    },
    {
      text: "The best of Romance",
      type: "romance",
      image: [
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9260-tbZARfVq8JoX.png",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/21650-qFjRMXrw1jku.jpg",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx97863-79AXrUZ7VQa5.jpg",
      ]
    },
    {
      text: "The best of Science Fiction",
      type: "shounen",
      image: [
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101302-7L0lcwYeFQQM.jpg",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-NuHM32a3VJsb.png",
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171627-EzihNzljlKKs.jpg",
      ]
    }
  ];

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
          <Link key={index} href={`/collection?type=${item.type}`} passHref>
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
