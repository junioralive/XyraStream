"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import CatalogSelect from "@/components/ui/CatalogSelect";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Options = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeData = [
    { key: "all", value: "All" },
    { key: "tv", value: "TV" },
    { key: "movie", value: "Movies" },
  ]

  const [type, setType] = useState(typeData.find(item => item?.key === (searchParams.get("type") || "all")));
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [isAdult, setIsAdult] = useState(searchParams.get("isAdult") === "true" || false);


  const applyFilters = useCallback(() => {
    const queryParams = new URLSearchParams({
      ...(search && { q: search }),
      ...(type && { type: type.key }),
      ...(isAdult && { isAdult: String(isAdult) }),
    });

    router.push(`/catalog${queryParams.toString() ? `?${queryParams}` : ""}`);
  }, [search, type, isAdult]);



  return (
    <div className="w-full flex max-[880px]:flex-col gap-4 mb-8">
      <div className="bg-[#242735] border-[#39374b] text-[15px] text-slate-200 w-full px-[24px] font-['poppins'] rounded-md py-1 border flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyUp={e => e.key === "Enter" && applyFilters()}
          className="w-full bg-transparent border-none outline-none max-[880px]:text-center"
        />
      </div>

      {/* type eg - movie, tv or all */}
      <CatalogSelect
        data={typeData}
        active={type}
        setActive={setType}
      />

      {/* show adult content */}
      <CatalogSelect
        data={[
          { key: true, value: "Yep, show me" },
          { key: false, value: "Hell, nah" },
        ]}
        active={isAdult}
        setActive={setIsAdult}
        ShouldBeKey={true}
      />


      <div
        className="bg-[#242735] border-[#39374b] cursor-pointer text-[15px] text-white w-full px-[24px] font-['poppins'] rounded-md py-1 border flex items-center justify-center gap-2"
        onClick={applyFilters}
      >
        Filter
      </div>
    </div>
  )
}

export default Options