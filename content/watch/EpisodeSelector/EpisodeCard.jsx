import { useCallback, useEffect, useState } from "react";
import { useWatchContext } from "@/context/Watch";
import clsx from "clsx";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const EpisodeCard = ({ info, currentEp, loading, watchedEP, posterImg }) => {

  const { setEpisode, season } = useWatchContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorLoadingImage, setErrorLoadingImage] = useState(false)

  useEffect(() => {
    setErrorLoadingImage(false)
  }, [season])


  const handleClick = useCallback(() => {
    const updateSortInUrl = (episodeNumber) => {
      const updatedParams = new URLSearchParams(searchParams);
      if (episodeNumber) {
        updatedParams.set("ep", episodeNumber);
      } else {
        updatedParams.delete("ep");
      }

      const newUrl = `${window.location.pathname}${updatedParams.toString() ? `?${updatedParams}` : ""}`;
      router.push(newUrl, { scroll: false });
    };

    if (info?.episode_number) {
      setEpisode(info.episode_number);
      updateSortInUrl(info.episode_number);
    }
  }, [info?.episode_number, setEpisode, searchParams, router]);

  if (loading) {
    return (
      <div className="flex py-2 h-[96px] my-[3px] border-2 border-[#21232e] rounded-md bg-[#242430] cursor-pointer group relative">
        <div className="absolute bottom-1/2 translate-y-1/2 flex gap-3 w-full">
          <div className="h-[80px] min-w-[150px] bg-[#48455f] rounded-md"></div>
          <div className="w-full flex flex-col gap-3">
            <div className="h-4 w-full bg-[#48465e] rounded-sm"></div>
            <div className="h-6 w-full bg-[#48465e] rounded-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentEpisode = currentEp === info?.episode_number;
  const isWatched = watchedEP?.includes(info?.episode_number);

  return (
    <div
      className={clsx(
        "flex gap-3 py-2 border-2 border-[#21232e] rounded-md cursor-pointer group",
        {
          "bg-[#242430]": isCurrentEpisode,
          "bg-[#1f1f28]": !isCurrentEpisode && !isWatched,
          "bg-[#2a2a38] hover:bg-[#1c1c26]": isWatched,
          "hover:bg-[#242430]": !isCurrentEpisode,
        }
      )}
      onClick={handleClick}
    >
      <div className="w-full max-w-[150px] relative">
        <Image
          src={`https://image.tmdb.org/t/p/w250_and_h141_bestv2${!errorLoadingImage ? info?.still_path : posterImg}`}
          alt={`Episode ${info?.episode_number}`}
          width={150}
          height={100}
          onError={() => setErrorLoadingImage(true)}
          className="object-cover w-full h-[82px] rounded-md"
        />
        <div className="text-[#ffffffe0] absolute bottom-1 right-1 bg-[#262233d4] px-1 rounded-lg text-[15px]">
          {info?.runtime || 24}m
        </div>
      </div>
      <div className="w-full pr-1">
        <div className="text-slate-200 break-words overflow-hidden text-ellipsis line-clamp-2 font-['Poppins'] text-sm">
          {
            info?.name ||
            "No title available"
          }
        </div>
        <div className="text-[#ffffffa3] font-['Poppins'] text-[14px]">
          Episode {info?.episode_number}
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
