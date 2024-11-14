"use client";
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

  // Providers list
  const Providers = [
    { key: 8, value: "NETFLIX" }, 
    { key: 350, value: "Apple TV Plus" }, 
    { key: 531, value: "Paramount Plus" }, 
    { key: 15, value: "Hulu" }, 
    { key: 384, value: "HBO Max" }, 
    { key: 9, value: "Amazon Prime Video" },     
    { key: 1899, value: "Max" }, 
    { key: 337, value: "Disney Plus" }, 
    { key: 387, value: "Peacock Premium" }, 
    { key: 584, value: "Discovery+" }
  ];

  // Initialize states based on URL search parameters or defaults
  const [type, setType] = useState(typeData.find(item => item.key === (searchParams.get("type") || "tv")));
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [provider, setProvider] = useState(Providers.find(item => item.key === parseInt(searchParams.get("provider"))) || Providers[0]);

  // Function to apply filters based on selected options
  const applyFilters = useCallback(() => {
    const queryParams = new URLSearchParams({
      ...(search && { q: search }),
      ...(type && { type: type.key }),
      ...(provider && { provider: provider.key }),
    });

    router.push(`/trending${queryParams.toString() ? `?${queryParams}` : ""}`);
  }, [search, type, provider]);

  // Update URL when type changes
  useEffect(() => {
    applyFilters();
  }, [type]);

  // Update URL when provider changes
  useEffect(() => {
    applyFilters();
  }, [provider]);

  return (
    <div className="w-full flex max-[880px]:flex-col gap-4 mb-8">
      {/* Type selector */}
      <CatalogSelect
        data={typeData}
        active={type}
        setActive={(newType) => setType(newType)}
      />

      {/* Provider selector */}
      <CatalogSelect
        data={Providers}
        active={provider}
        setActive={(newProvider) => setProvider(newProvider)}
      />
    </div>
  );
}

export default Options;
