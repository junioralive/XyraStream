"use client"; // Add this line

import { useState } from "react";
import FeaturedCard from "@/components/Cards/ProviderCard/ProviderCard";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import Link from "next/link";

const Providers = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const data = [
    {
      text: "Netflix",
      type: "8",
      image: ['https://image.tmdb.org/t/p/w500/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg']
    },
    {
      text: "Apple TV Plus",
      type: "350",
      image: ['https://www.themoviedb.org/t/p/w500/2E03IAZsX4ZaUqM7tXlctEPMGWS.jpg']
    },
    {
      text: "Paramount Plus",
      type: "531",
      image: ['https://www.themoviedb.org/t/p/w500/h5DcR0J2EESLitnhR8xLG1QymTE.jpg']
    },
    {
      text: "Hulu",
      type: "15",
      image: ['https://www.themoviedb.org/t/p/w500/bxBlRPEPpMVDc4jMhSrTf2339DW.jpg']
    },
    {
        text: "HBO Max",
        type: "384",
        image: ['https://www.themoviedb.org/t/p/w500/b8edpTaLCHFrUnhpGQIZJUpFX7T.jpg']
    },
    {
        text: "Amazon Prime Video",
        type: "9",
        image: ['https://www.themoviedb.org/t/p/w500/dQeAar5H991VYporEjUspolDarG.jpg']
    },
    {
        text: "Max",
        type: "1899",
        image: ['https://www.themoviedb.org/t/p/w500/fksCUZ9QDWZMUwL2LgMtLckROUN.jpg']
    },
    {
        text: "Disney Plus",
        type: "337",
        image: ['https://www.themoviedb.org/t/p/w500/97yvRBw1GzX7fXprcF80er19ot.jpg']
    },
    {
        text: "Peacock Premium+",
        type: "387",
        image: ['https://www.themoviedb.org/t/p/w500/drPlq5beqXtBaP7MNs8W616YRhm.jpg']
    },
    {
        text: "Discovery+",
        type: "584",
        image: ['https://www.themoviedb.org/t/p/w500/eMTnWwNVtThkjvQA6zwxaoJG9NE.jpg']
    }
  ];

  return (
    <div className="w-full max-w-[96rem] relative mx-5">
      <div className="flex justify-between">
        <h1 className="text-[#f6f4f4ea] font-medium text-2xl font-['poppins'] max-[450px]:text-[1.2rem]">
          | Providers
        </h1>

        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#ffffffbd] flex items-center gap-1 cursor-pointer hover:text-slate-500 transition"
        >
          {isExpanded ? "Show Less" : "See All"} {isExpanded ? <FaArrowDown /> : <FaArrowRight />}
        </div>
      </div>

      <div className="mt-8 mb-16 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {data.slice(0, isExpanded ? data.length : 8).map((item, index) => (
          <Link key={index} href={`/trending?type=tv&provider=${item.type}`} passHref>
            <div className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-md transition transform hover:scale-105">
              <FeaturedCard data={item} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Providers;
